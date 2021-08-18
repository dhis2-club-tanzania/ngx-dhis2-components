import { Injectable } from '@angular/core';
import { flatten } from 'lodash';
import { Observable, of, throwError, zip } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { getDataStoreUrlParams } from '../helpers/get-data-store-url-params.helper';
import { ErrorMessage } from '../models/error-message.model';
import { HttpConfig } from '../models/http-config.model';
import { NgxDhis2HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class DataStoreService {
  private _dataStoreApiPrefix: string;
  private _namespace: string;
  constructor(private httpClient: NgxDhis2HttpClientService) {
    this._dataStoreApiPrefix = 'dataStore/';
  }

  findNamespaceKeys(): Observable<string[]> {
    return this.httpClient.get(this._dataStoreApiPrefix + this._namespace).pipe(
      catchError((error: ErrorMessage) => {
        if (error.status === 404) {
          return of([]);
        }

        return throwError(error);
      })
    );
  }

  findByKeys(keys: string[], httpConfig: HttpConfig): Observable<any[]> {
    if (keys?.length === 0) {
      return of([]);
    }
    return zip(
      ...(keys || []).map((key: string) => this.findOne(key, httpConfig))
    ).pipe(
      map((results: any[]) =>
        flatten((results || []).filter((resultItem) => resultItem))
      )
    );
  }

  findAll(httpConfig: HttpConfig): Observable<{ [namespace: string]: any[] }> {
    return this.findNamespaceKeys().pipe(
      switchMap((keys: string[]) =>
        this.findByKeys(keys, httpConfig).pipe(
          map((keyValues) => ({
            [this._namespace]: keyValues,
          }))
        )
      )
    );
  }

  findOne(key: string, httpConfig: HttpConfig): Observable<any> {
    return this.httpClient
      .get(`${this._dataStoreApiPrefix + this._namespace}/${key}`, httpConfig)
      .pipe(
        catchError((error: ErrorMessage) => {
          if (error.status === 404) {
            return of(null);
          }

          return throwError(error);
        })
      );
  }

  get(dataStoreUrl: string, httpConfig: HttpConfig): Observable<any> {
    const { key, namespace } = getDataStoreUrlParams(dataStoreUrl) || {
      key: undefined,
      namespace: undefined,
    };

    this._namespace = namespace;

    if (key) {
      return this.findOne(key, httpConfig);
    }

    return this.findAll(httpConfig);
  }

  saveByTrial(data: any): Observable<any> {
    return this.update(data).pipe(catchError(() => this.create(data)));
  }

  create(data: any): Observable<any> {
    return this.httpClient
      .post(`${this._dataStoreApiPrefix + this._namespace}/${data.id}`, data)
      .pipe(map(() => data));
  }

  update(data: any): Observable<any> {
    return this.httpClient
      .put(`${this._dataStoreApiPrefix + this._namespace}/${data.id}`, data)
      .pipe(map(() => data));
  }
}
