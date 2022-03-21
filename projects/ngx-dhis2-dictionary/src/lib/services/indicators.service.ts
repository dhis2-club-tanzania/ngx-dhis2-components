import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import * as _ from 'lodash';
import { from, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import mapLimit from 'async';
import * as async from 'async';

@Injectable()
export class IndicatorsService {
  indicators: any[] = [];
  concurrencyCount = 0;
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  // load indicators
  loadIndicatorsByPage(
    page: number,
    pageCount: number,
    searchingText?: string
  ): Observable<any> {
    return this.httpClient
      .get(
        'indicators.json?' +
          (searchingText ? 'filter=name:ilike:' + searchingText + '&' : '') +
          'fields=id,name,numerator,denominator,indicatorType[name],denominatorDescription,numeratorDescription,user[name],lastUpdated,indicatorGroups[id]&pageSize=' +
          pageCount +
          '&page=' +
          page
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => of(error))
      );
  }

  loadProgramIndicatorsByPage(
    page: number,
    pageCount: number,
    searchingText?: string
  ): Observable<any> {
    return this.httpClient
      .get(
        'programIndicators.json?' +
          (searchingText ? 'filter=name:ilike:' + searchingText + '&' : '') +
          'fields=*&pageSize=' +
          pageCount +
          '&page=' +
          page
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => of(error))
      );
  }

  loadIndicatorsById(id: string): Observable<any> {
    let url =
      'indicators/' +
      id +
      '.json?fields=id,name,numerator,denominator,indicatorType[name],';
    url +=
      'denominatorDescription,numeratorDescription,user[name],lastUpdated,indicatorGroups[id]';
    return this.httpClient.get(url).pipe(
      map((response) => response),
      catchError((error) => of(error))
    );
  }

  // fetchUrl(url, callback): any {
  //   var delay = parseInt(((Math.random() * 10000000) % 2000).toString(), 10);
  //   this.concurrencyCount++;
  //   setTimeout(() => {
  //     this.concurrencyCount--;
  //     callback(
  //       null,
  //       this.httpClient.get(url).pipe(map((response) => response?.indicators))
  //     );
  //   }, delay);
  // }

  _loadAllIndicators1(pagerDefinitions): Observable<any> {
    // format pageSize as per number of indicators
    let pageSize = 20;
    let pageCount = 1;
    if (pagerDefinitions.total < 200) {
      pageSize = 20;
      pageCount = Math.ceil(pagerDefinitions.total / pageSize);
    } else if (pagerDefinitions.total <= 3000 && pagerDefinitions.total > 200) {
      pageSize = 100;
      pageCount = Math.ceil(pagerDefinitions.total / pageSize);
    } else if (pagerDefinitions.total > 3000) {
      pageSize = 400;
      pageCount = Math.ceil(pagerDefinitions.total / pageSize);
      // pageSize = pagerDefinitions.pageSize;
      // pageCount = pagerDefinitions.pageCount;
    }
    return from(
      _.map(
        _.range(1, pageCount + 1),
        (pageNumber) =>
          'indicators.json?fields=:all,lastUpdatedBy[id,name],displayName,id,name,' +
          'numeratorDescription,denominatorDescription,denominator,numerator,annualized,decimals,' +
          'indicatorType[name],user[name],attributeValues[value,attribute[name]],indicatorGroups[id,name,indicators~size],' +
          'legendSets[id,name,symbolizer,legends~size],dataSets[id,name]&pageSize=' +
          pageSize +
          '&page=' +
          pageNumber
      )
    ).pipe(
      mergeMap(
        (url: string) => {
          console.log(url);
          return this.httpClient
            .get(url)
            .pipe(map((indicators: any) => indicators));
        },
        null,
        1
      )
    );
  }

  _loadAllProgramIndicators(pagerDefinitions): Observable<any> {
    // format pageSize as per number of indicators
    let pageSize = 20;
    let pageCount = 1;
    if (pagerDefinitions.total < 200) {
      pageSize = 20;
      pageCount = Math.ceil(pagerDefinitions.total / pageSize);
    } else if (pagerDefinitions.total <= 3000 && pagerDefinitions.total > 200) {
      pageSize = 100;
      pageCount = Math.ceil(pagerDefinitions.total / pageSize);
    } else if (pagerDefinitions.total > 3000) {
      pageSize = 400;
      pageCount = Math.ceil(pagerDefinitions.total / pageSize);
      // pageSize = pagerDefinitions.pageSize;
      // pageCount = pagerDefinitions.pageCount;
    }
    return from(
      _.map(
        _.range(1, pageCount + 1),
        (pageNumber) =>
          'programIndicators.json?fields=:all&pageSize=' +
          pageSize +
          '&page=' +
          pageNumber
      )
    ).pipe(
      mergeMap(
        (url: string) =>
          this.httpClient.get(url).pipe(map((indicators: any) => indicators)),
        null,
        1
      )
    );
  }

  _indicatorProperties(indicatorsObj): Observable<any> {
    this.indicators = [...this.indicators, ...indicatorsObj];
    console.log(this.indicators);
    return from(
      _.map(
        this.indicators,
        (indicator) =>
          'indicators/' +
          indicator.id +
          '.json?fields=:all,lastUpdatedBy[id,name],displayName,id,name,' +
          'numeratorDescription,denominatorDescription,denominator,numerator,annualized,decimals,' +
          'indicatorType[name],user[name],indicatorGroups[name,indicators~size]'
      )
    ).pipe(
      mergeMap(
        (url: string) =>
          this.httpClient.get(url).pipe(map((indicators: any) => indicators)),
        null,
        1
      )
    );
  }
}
