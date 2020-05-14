import { HttpErrorResponse, HttpEvent, HttpHandler,
    HttpInterceptor, HttpRequest, HttpResponse,
    HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.getUrlParameter('token');
        if (token) {
            const header = `Bearer ${token}`;
            const headers = request.headers.set('Authorization', header);
            request = request.clone({ headers });
            AuthService.storeToken(token);
        }
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((err: HttpErrorResponse) => {
                console.log('TokenInterceptor err', err);
                if (err.status === 401) {
                    this.router.navigate(['/login']);
                }
                if (err.status === 400) {
                    alert(err.error + JSON.stringify(err.error));
                }
                if (err.status === 404) {
                    this.router.navigate(['/errors']);
                }
                return throwError(err);
            }));
    }

    private getUrlParameter(name: string) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(window.location.search);

        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
}

export const authenticationInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
    deps: [AuthService]
};
