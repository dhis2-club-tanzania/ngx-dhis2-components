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
  loadIndicatorsByPage(page: number, pageCount: number) {
    let url =
      'indicators.json?fields=id,name,numerator,denominator,indicatorType[name],';
    url +=
      'denominatorDescription,numeratorDescription,user[name],lastUpdated,indicatorGroups[id]&pageSize=' +
      pageCount +
      '&page=' +
      page;
    return this.httpClient.get(url).pipe(
      map((response) => {
        console.log(response);
        return response;
      }),
      catchError((error) => of(error))
    );
  }

  loadIndicatorsById(id) {
    let url =
      'indicators/' +
      id +
      '.json?fields=id,name,numerator,denominator,indicatorType[name],';
    url +=
      'denominatorDescription,numeratorDescription,user[name],lastUpdated,indicatorGroups[id]';
    return this.httpClient.get(url);
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

  _loadAllIndicators(pagerDefinitions): Observable<any> {
    const urls = [
      'indicators.json?fields=:all,lastUpdatedBy[id,name],displayName,id,name,' +
        'numeratorDescription,denominatorDescription,denominator,numerator,annualized,decimals,' +
        'indicatorType[name],user[name],attributeValues[value,attribute[name]],indicatorGroups[id,name,indicators~size],' +
        'legendSets[id,name,symbolizer,legends~size],dataSets[id,name]&pageSize=' +
        5 +
        '&page=' +
        1,
      'indicators.json?fields=:all,lastUpdatedBy[id,name],displayName,id,name,' +
        'numeratorDescription,denominatorDescription,denominator,numerator,annualized,decimals,' +
        'indicatorType[name],user[name],attributeValues[value,attribute[name]],indicatorGroups[id,name,indicators~size],' +
        'legendSets[id,name,symbolizer,legends~size],dataSets[id,name]&pageSize=' +
        5 +
        '&page=' +
        2,
      'indicators.json?fields=:all,lastUpdatedBy[id,name],displayName,id,name,' +
        'numeratorDescription,denominatorDescription,denominator,numerator,annualized,decimals,' +
        'indicatorType[name],user[name],attributeValues[value,attribute[name]],indicatorGroups[id,name,indicators~size],' +
        'legendSets[id,name,symbolizer,legends~size],dataSets[id,name]&pageSize=' +
        5 +
        '&page=' +
        3,
      'indicators.json?fields=:all,lastUpdatedBy[id,name],displayName,id,name,' +
        'numeratorDescription,denominatorDescription,denominator,numerator,annualized,decimals,' +
        'indicatorType[name],user[name],attributeValues[value,attribute[name]],indicatorGroups[id,name,indicators~size],' +
        'legendSets[id,name,symbolizer,legends~size],dataSets[id,name]&pageSize=' +
        5 +
        '&page=' +
        4,
    ];

    // TODO: Review this implementation

    function getAndSaveHFDataByChuck(url, callback) {
      console.log(url);
      this.httpClient.get(`${url}`).pipe(
        map((response) => {
          return callback(null, response);
        }),
        catchError((error) => of(callback(error, null)))
      );
    }

    const data = new Promise((resolve, reject) => {
      return async.mapLimit(
        urls,
        5,
        async.reflect(getAndSaveHFDataByChuck),
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(
              _.flatten(
                res.map((response) => response.value).filter((value) => value)
              )
            );
          }
        }
      );
    });
    return of(data);
  }

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
