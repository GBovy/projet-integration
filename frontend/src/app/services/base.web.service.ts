import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { share, tap } from 'rxjs/operators';

export const ACCESS_TOKEN = 'accessToken';

export class BaseWebService {

    protected static token;
    // protected static refreshToken;
    protected cache: any = {};
    protected concurrency: any = {};

    constructor(@Inject(HttpClient) public http: HttpClient, @Inject(TranslateService) public translate: TranslateService) {
        if (typeof localStorage !== 'undefined') {
            BaseWebService.token = localStorage[ACCESS_TOKEN];
            // BaseWebService.refreshToken = localStorage['nbRefresh'];
        }
    }

    private getTokenHeader(): { [key: string]: string; } {
        let result: { [key: string]: string; } = {};
        if (BaseWebService.token) {
            result = { 'Authorization': 'Bearer ' + BaseWebService.token };
        }
        // refreshToken if token is expired
        // renewRefresh
        // renewToken
        return result;
    }

    public getDefaultHeaderObject(otherHeaders?: { [name: string]: string }): { [name: string]: string } {
        return { ...this.getTokenHeader(), ...otherHeaders };
    }

    private getDefaultHeaders(otherHeaders?: { [name: string]: string }): HttpHeaders {
        return new HttpHeaders(this.getDefaultHeaderObject(otherHeaders));
    }

    protected _get(url: string, params?: HttpParams, cache = { cache: false, concurrency: true, force: false },
        responseType: 'json' | 'text' = 'json'): Observable<any> {
        let serviceCall: Observable<any>;
        const cacheKey = url + (params ? JSON.stringify(params) : '');
        // Get from cache
        if (cache.cache && !cache.force) {
            if (this.cache[cacheKey]) {
                serviceCall = of(this.cache[cacheKey]);
            }
        }

        if (!cache.concurrency && this.concurrency[cacheKey]) {
            serviceCall = this.concurrency[cacheKey];
        }

        // If no cache available
        if (!serviceCall) {
            serviceCall = this.http.get(url, { headers: this.getDefaultHeaders(), params: params, responseType: <any>responseType });
            // If must save it cache
            if (cache.cache) {
                serviceCall = serviceCall.pipe(
                    tap(response => {
                    this.cache[cacheKey] = response;
                }));
            }

            if (!cache.concurrency) {
                serviceCall = serviceCall.pipe(tap(response => {
                    this.concurrency[cacheKey] = null;
                })).pipe(share());
                this.concurrency[cacheKey] = serviceCall;
            }
        }
        return serviceCall;
    }

    protected _put(url: string, data: any): Observable<any> {
        return this.http.put(url, data, { headers: this.getDefaultHeaders() });
    }

    protected _post(url: string, data: any, headers: { [name: string]: string } = {}): Observable<any> {
        return this.http.post(url, data, { headers: this.getDefaultHeaders(headers) });
    }

    protected _delete(url: string, params?: HttpParams): Observable<any> {
        return this.http.delete(url, { headers: this.getDefaultHeaders(), params: params });
    }

    protected handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

    protected log(message: string) {
        console.log('message', message);
    }
}
