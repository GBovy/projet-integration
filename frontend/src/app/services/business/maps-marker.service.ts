import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/operators';

@Injectable()
export class MapsMarkerService {


    constructor(private http: HttpClient) { }

    public makeAddressesMarkers(queryToMap: string): Observable<any> {
        return this.http.get(queryToMap).pipe(
            take(1),
            map((res: any) => {
                console.log('maps res', res);
                return res;
            }));
    }

    public getMapsData(data1: {lat: number, lng: number}, data2: {lat: number, lng: number}): Observable<number> {
        return this.http.get(
            // tslint:disable-next-line: max-line-length
            `https://routing.openstreetmap.de/routed-car/route/v1/driving/${data1.lng},${data1.lat};${data2.lng},${data2.lat}?overview=false&alternatives=true&steps=true`
        ).pipe(
            take(1),
            map((res: any) => {
                return res.routes[0];
            })
        );
    }
}
