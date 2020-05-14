import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserRole } from 'src/app/models/enums/user-role.enum';
import { environment } from '../../environments/environment';
import { UserInterface } from '../models/interfaces/user.interface';
import { BaseWebService } from './base.web.service';

export const USER_ROLE = 'userRole';

@Injectable()
export class UserService extends BaseWebService {

    public getCurrentUser(): Observable<UserInterface> {
        return this._get(`${environment.baseUrl}/user`)
            .pipe(
                tap(user => {
                    this.log('fetched User');
                    this.storeUserRole(user.userRole);
                }),
                catchError(this.handleError('getCurrentUser', []))
            );
    }

    public updateCurrentUser(user: UserInterface): Observable<UserInterface> {
        return this._put(`${environment.baseUrl}/user`, user)
            .pipe(
                tap(user => {
                    this.log('updated User');
                    this.storeUserRole(user.userRole);
                }),
                catchError(this.handleError('putCurrentUser', []))
            );
    }

    public updateUserFile(fileName: string): Observable<UserInterface> {
        return this._put(`${environment.baseUrl}/user/file`, fileName)
            .pipe(
                tap(user => {
                    this.log('updated User file');
                    this.storeUserRole(user.userRole);
                }),
                catchError(this.handleError('updateUserFile', []))
            );
    }

    public isProfileCompleted(): Observable<boolean> {
        return this._get(`${environment.baseUrl}/user/completed`)
            .pipe(
                tap(_ => this.log('fetched user completed')),
                catchError(this.handleError('isUserCompleted', []))
            );
    }

    public storeUserRole(role: UserRole) {
        localStorage.setItem(USER_ROLE, role);
    }

    public sendMail(obj: {subject : string, mail : string , receiver : string}) {
        return this._post(`${environment.baseUrl}/user/sendMail`, obj)
            .pipe(
                tap(_ => this.log('posted mail')),
                catchError(this.handleError('sendMail', []))
            );  
    }

}