import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { BaseWebService, ACCESS_TOKEN } from './base.web.service';

@Injectable()
export class AuthService extends BaseWebService {

    /**
     * You can subscribe this to be notified when connection status change.
     */
    public connectionStatusChange = new EventEmitter<boolean>();

    constructor(
        public http: HttpClient,
        public translate: TranslateService,
        private userService: UserService
    ) {
        super(http, translate);
    }

    /**
     * Save token in service and in localStorage `accessToken`.
     *
     * To remove token give null or empty string.
     *
     * @param newToken token to store.
     */
    public static storeToken(newToken: string) {
        BaseWebService.token = newToken;
        if (newToken) {
            localStorage[ACCESS_TOKEN] = BaseWebService.token;
        } else {
            localStorage.removeItem(ACCESS_TOKEN);
        }
    }

    /**
     * Logout current user.
     */
    public logout(): Observable<boolean> {
        AuthService.storeToken('');
        this.connectionStatusChange.emit(false);
        return of(true);
    }

    public register(signupRequest: any): Observable<any> {
        return this._post(`${environment.baseUrl}/auth/register`, signupRequest)
            .pipe(
                tap(_ => this.log('Register success')),
                catchError(this.handleError('register', []))
            );
    }

    public login(loginRequest: any): Observable<boolean> {
        return this._post(`${environment.baseUrl}/auth/login`, loginRequest)
            .pipe(
                tap(response => {
                    this.log('Login success');
                    AuthService.storeToken(response.accessToken);
                    this.connectionStatusChange.emit(true);
                    return true;
                }),
                tap(() => {
                    this.userService.getCurrentUser().subscribe();
                }),
                catchError(this.handleError('login', []))
            );
    }

    /**
     * Check if user is connected.
     */
    public isConnected(): Observable<boolean> {
        const result = !!BaseWebService.token && this.checkTokenExpiration();
        if (!!BaseWebService.token && !result) {
            AuthService.storeToken('');
        }
        return of(!!BaseWebService.token && this.checkTokenExpiration());
    }

    public askNewPassword(email: string) {
        return this._post(`${environment.baseUrl}/password/reset`, {
            email
        });
    }

    /**
     * Check if expiration date of stored token if in future or now.
     *
     * Return true if yes and false for other cases (even if there is no token stored).
    */
    private checkTokenExpiration(): boolean {
        let result = false;
        const expirationDate = this.getTokenExpirationDate();
        if (expirationDate) {
            result = new Date().getTime() <= this.getTokenExpirationDate().getTime();
        }
        return result;
    }

    /**
     * Get expiration date from stored token.
     *
     * Return undefined if no token is present.
    */
    private getTokenExpirationDate() {
        const parsedToken = this.parseToken();
        return parsedToken ? new Date(parsedToken['exp'] * 1000) : undefined;
    }

    /**
     * Read token as object.
     *
     * Return null if no token is present.
    */
    private parseToken(): any {
        // Token samples : http://jwtbuilder.jamiekurtz.com/
        // Parser from : https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript
        if (BaseWebService.token) {
            const base64Url = BaseWebService.token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        }
        return null;
    }

}
