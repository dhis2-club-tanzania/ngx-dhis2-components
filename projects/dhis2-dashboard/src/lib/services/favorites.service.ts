import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DashboardItem } from '../models/dashboard-item.model';
import { VisualizationDetailsModel } from '../models/dashboard.model';

import * as async from 'async';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getFavorites(): Observable<DashboardItem[]> {
    return this.httpClient.get('dashboardItems?paging=false').pipe(
      map((dashboardItemsResponse) => {
        return dashboardItemsResponse?.dashboardItems
          ? dashboardItemsResponse?.dashboardItems
          : [];
      }),
      catchError((error) => {
        return of(error);
      })
    );
  }

  getVisualizationsConfigurations(
    visualizationsDetails: VisualizationDetailsModel[]
  ): Observable<any> {
    let data = [];
    let errors = {};
    return of({});
    // return new Observable((observer) => {
    //   async.mapLimit(
    //     visualizationsDetails,
    //     3,
    //     async.reflect((visualizationDetails, callback) => {
    //       console.log('option 2');
    //       console.log(visualizationsDetails);

    //       this.httpClient
    //         .get(
    //           `visualizations/${visualizationDetails?.visId}.json?fields=id,name,*,legendSet[*],columns[dimension,dimensionType,items[*]],rows[dimension,dimensionType,items[*]],filters[dimension,dimensionType,items[*]]`
    //         )
    //         .subscribe(
    //           (results) => {
    //             if (results) {
    //               const peKey =
    //                 results?.rows?.length > 0 &&
    //                 (
    //                   results?.rows?.filter((row) => row?.dimension === 'pe') ||
    //                   []
    //                 ).length > 0
    //                   ? 'rows'
    //                   : results?.columns?.length > 0 &&
    //                     (
    //                       results?.columns?.filter(
    //                         (column) => column?.dimension === 'pe'
    //                       ) || []
    //                     ).length > 0
    //                   ? 'columns'
    //                   : results?.filters?.length > 0 &&
    //                     (
    //                       results?.filters?.filter(
    //                         (filter) => filter?.dimension === 'pe'
    //                       ) || []
    //                     ).length > 0
    //                   ? 'filters'
    //                   : null;
    //               const ouKey =
    //                 results?.rows?.length > 0 &&
    //                 (
    //                   results?.rows?.filter((row) => row?.dimension === 'ou') ||
    //                   []
    //                 ).length > 0
    //                   ? 'rows'
    //                   : results?.columns?.length > 0 &&
    //                     (
    //                       results?.columns?.filter(
    //                         (column) => column?.dimension === 'ou'
    //                       ) || []
    //                     ).length > 0
    //                   ? 'columns'
    //                   : results?.filters?.length > 0 &&
    //                     (
    //                       results?.filters?.filter(
    //                         (filter) => filter?.dimension === 'ou'
    //                       ) || []
    //                     ).length > 0
    //                   ? 'filters'
    //                   : null;
    //               data = [
    //                 ...data,
    //                 {
    //                   ...visualizationDetails,
    //                   ...results,
    //                   periods: results[peKey][0],
    //                   organisationUnits: results[ouKey][0],
    //                 },
    //               ];
    //               callback(null, results);
    //             }
    //           },
    //           (err) => {
    //             errors[visualizationDetails?.visId] = err;
    //             callback(err, null);
    //           }
    //         );
    //     }),
    //     () => {
    //       observer.next(data);
    //       observer.complete();
    //     }
    //   );
    // });
  }

  getVisualizationConfigs(id: string): Observable<any> {
    console.log('option 3');

    return this.httpClient.get(
      `visualizations/${id}.json?fields=id,name,*,columns[dimension,dimensionType,items[*]],rows[dimension,dimensionType,items[*]],filters[dimension,dimensionType,items[*]]`
    );
  }
}
