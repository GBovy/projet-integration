import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PackInterface } from 'src/app/models/interfaces/pack.interface';
import { environment } from './../../environments/environment';
import { OrderInterface } from './../models/interfaces/order.interface';
import { UserInterface } from './../models/interfaces/user.interface';
import { BaseWebService } from './base.web.service';
import { Order } from '../models/order.model';

@Injectable()
export class OrderService extends BaseWebService {

    /*
    protected _post(url: string, data: any, headers: { [name: string]: string } = {}): Observable<any> {
        return this.http.post(url, data, { headers: this.getDefaultHeaders(headers) });
    }
    */

    public postOrderProduct(rideId: string, order: OrderInterface, pack: PackInterface, stripeToken: string) {
        return this._post(`${environment.baseUrl}/order/${rideId}`,
                { orderDto: order, packageDto: pack, stripeToken }
            ).pipe(
                tap(_ => this.log('fetched Order response')),
                catchError(this.handleError('postOrder', []))
            );
    }

    public getMyOrders(): Observable<OrderInterface[]> {
    
        return this._get(`${environment.baseUrl}/order/my-orders`)
            .pipe(
                tap(_ => this.log('fetched my orders')),
                catchError(this.handleError('getMyOrders', []))
            );
    }

    public delete(uuid: String) : Observable<OrderInterface[]> {

    return this._delete(`${environment.baseUrl}/order/delete?uuid=${uuid}`)
        .pipe(
            tap(_ => this.log('fetched Order response')),
            catchError(this.handleError('delete', []))
        );  
    }
    
}