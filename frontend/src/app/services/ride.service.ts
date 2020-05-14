import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Ride } from 'src/app/models/ride.model';
import { Pack } from 'src/app/models/pack.model';
import { environment } from 'src/environments/environment';
import { DeliveryType } from '../models/enums/delivery-type.enum';
import { BaseWebService } from './base.web.service';
import { RideInterface } from '../models/interfaces/ride.interface';
import { CalculationInterface } from '../models/interfaces/calculation.interface';

@Injectable()
export class RideService extends BaseWebService {

    public createRide(rideDto: any): Observable<Ride> {
        return this._post(`${environment.baseUrl}/ride`, rideDto)
        .pipe(
            tap(_ => this.log('posted Ride')),
            catchError(this.handleError('createRide', []))
        );
    }

    public createPack(packDto: any): Observable<Pack> {
        return this._post(`${environment.baseUrl}/pack`, packDto)
        .pipe(
            tap(_ => this.log('posted Pack')),
            catchError(this.handleError('createPack', []))
        );
    }

    public calculateRide(obj: { distance: number, price: number, volume: string, mass: string })
    : Observable<CalculationInterface> {
            return this._post(`${environment.baseUrl}/ride/calculate`, obj).pipe(
                tap(_ => this.log('posted calculateRide')),
                catchError(this.handleError('calculateRide', []))
            );
    }

    public getRideById(id: number): Observable<RideInterface> {
        const params = new HttpParams().set('id', id.toString());
        return this._get(`${environment.baseUrl}/ride`, params)
            .pipe(
                tap(_ => this.log('fetched Product')),
                catchError(this.handleError('getProduct', []))
            );
    }

    public getRides(type: DeliveryType): Observable<RideInterface[]> {
        const params = new HttpParams().set('type', type.toString());
        return this._get(`${environment.baseUrl}/rides`, params)
            .pipe(
                tap(_ => this.log('fetched Products')),
                catchError(this.handleError('getProducts', []))
            );
    }

    public createDelivery(deliveryProduct: RideInterface): Observable<RideInterface> {
        return this._post(`${environment.baseUrl}/create-delivery`, { deliveryProduct })
            .pipe(
                tap(_ => this.log('posted Delivery Product')),
                catchError(this.handleError('createDelivery', []))
            );
    }

    public getMyRides(type: DeliveryType): Observable<RideInterface[]> {
        const params = new HttpParams().set('type', type.toString());
        return this._get(`${environment.baseUrl}/my-rides`, params)
            .pipe(
                tap(_ => this.log('fetched Products')),
                catchError(this.handleError('getProducts', []))
            );
    }

    public getProductByCity(searchParams: {startingCity: string, destinationCity: string}, deliveryType: DeliveryType)
        : Observable<RideInterface[]> {

        // tslint:disable-next-line: max-line-length
        return this._get(`${environment.baseUrl}/search-products?startingCity=${searchParams.startingCity}&destinationCity=${searchParams.destinationCity}&deliveryType=${deliveryType}`)
            .pipe(
                tap(_ => this.log('fetched Products')),
                catchError(this.handleError('getProductByCity', []))
            );
    }

}
