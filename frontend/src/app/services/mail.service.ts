import { Injectable } from '@angular/core';
import { BaseWebService } from './base.web.service';
import { UserInterface } from './../models/interfaces/user.interface';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class MailService extends BaseWebService {

    public sendMail(email : string) /*: Observable<UserInterface[]>*/ {/*
        */console.log("MailService");/*
        return this._get(`${environment.baseUrl}/email/sendMail?email=${email}`)
            .pipe(
                tap(_ => this.log('fetched Order response')),
                catchError(this.handleError('sendMail', []))
            );  */
        }

}