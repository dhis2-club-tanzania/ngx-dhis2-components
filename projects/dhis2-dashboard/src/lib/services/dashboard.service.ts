import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Dashboard } from '../models/dashboard.model';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { sanitizeDashboards } from '../helpers/sanitize-dashboards.helper';
import * as async from 'async';

const dashboardApiFields =
  'fields=id,name,user[id,name],description,access,created,lastUpdated,' +
  'favorite,dashboardItems[id,type,height,width,x,y,shape,map[id,name],' +
  'chart[id,name],eventChart[id,name],reportTable[id,name],resources[id,name],' +
  'reports[id,name],messages[id,name]],favorites&pageSize=10';
const dashboardApiNamespace = 'dashboards';
@Injectable()
export class DashboardService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getAll(configs: any) {
    if (!configs?.useDataStore) {
      return this.httpClient
        .get(`${dashboardApiNamespace}?${dashboardApiFields}`)
        .pipe(
          map((dashboardResponse: any) =>
            dashboardResponse.dashboards
              ? sanitizeDashboards(dashboardResponse.dashboards)
              : [] || []
          )
        );
    } else {
      return this.getDashboardKeys(configs?.dataStoreKeyRef).pipe(
        switchMap((keys) => {
          return this.loadAll(keys);
        })
      );
    }
  }

  loadAll(keys): Observable<any> {
    let data = [];
    return new Observable((observer) => {
      async.mapLimit(
        keys,
        10,
        async.reflect((key, callback) => {
          this.httpClient.get(`dataStore/dashboards/${key}`).subscribe(
            (results) => {
              data = [...data, results];
              callback(null, results);
            },
            (err) => {
              callback(err, null);
            }
          );
        }),
        () => {
          const response = data ? sanitizeDashboards(data) : [] || [];
          observer.next(response);
          observer.complete();
        }
      );
    });
  }

  getDashboardKeys(keysPrefix): Observable<string[]> {
    return this.httpClient.get(`dataStore/dashboards.json`).pipe(
      map((response) => {
        return response && response?.length > 0
          ? response?.filter((key) => key.indexOf(keysPrefix) > -1) || []
          : [];
      })
    );
  }

  getOne(id: string) {
    return this.httpClient.get(
      `${dashboardApiNamespace}/${id}?${dashboardApiFields}`
    );
  }

  getDashboardItem(id: string): Observable<any> {
    return this.httpClient.get(`dashboardItems/${id}`);
  }

  save(dashboard: Dashboard, action: string) {
    if (!dashboard) {
      return throwError({
        status: 400,
        statusText: 'Error',
        message: 'Dashboard object could not be identified',
      });
    }
    let formattedDashboardForUpdate = {};
    /**
     * TODO: Change hard coded height to use number height from where dashboard items are formatted
     */
    if (action !== 'CREATE') {
      Object.keys(dashboard)
        .filter((key) => key !== 'id')
        .forEach((key) => {
          formattedDashboardForUpdate[key] =
            key !== 'dashboardItems'
              ? dashboard[key]
              : dashboard[key].map((item) => {
                  return {
                    ...item,
                    height: 450,
                  };
                });
        });
    }
    return (
      action === 'CREATE'
        ? this.httpClient.post(`${dashboardApiNamespace}`, dashboard)
        : this.httpClient.put(
            `${dashboardApiNamespace}/${dashboard.id}`,
            formattedDashboardForUpdate
          )
    ).pipe(map(() => dashboard));
  }

  delete(id: string) {
    return this.httpClient.delete(`${dashboardApiNamespace}/${id}`);
  }

  // NEW
  getAllDashboardConfigs() {
    const url = 'dataStore/ehs/dashboards';
    return this.httpClient.get(url);
  }

  getDashboardItemsConfigs(id: String) {
    const dashboardConfigsUrl = `dashboards/${id}.json?fields=id,name,description,favorite,dashboardItems[id,type,shape,visualization[id],chart~rename(visualization)]`;

    return this.httpClient.get(dashboardConfigsUrl).pipe(
      map((results) => results),
      catchError((error) => {
        return of({});
      })
    );
  }

  getChartConfigs(chartId: String) {
    console.log("option 1")
    const chartUrl = `visualizations/${chartId}.json?fields=id,type,dataElementDimensions,displayName~rename(name),displayDescription~rename(description),columns[dimension,legendSet[id],filter,items[dimensionItem~rename(id),displayName~rename(name),dimensionItemType]],rows[dimension,legendSet[id],filter,items[dimensionItem~rename(id),displayName~rename(name),dimensionItemType]],filters[dimension,legendSet[id],filter,items[dimensionItem~rename(id),displayName~rename(name),dimensionItemType]]`;

    return this.httpClient.get(chartUrl);
  }

  getVisualizationsConfigs(item: any, selections?: any[]): Observable<any> {
    const url = `${item?.type.toLowerCase()}s/${
      item?.visualization?.id
    }.json?fields=id,name,type,dataElementDimensions,displayName~rename(name),displayDescription~rename(description),columns[dimension,legendSet[id],filter,items[dimensionItem~rename(id),displayName~rename(name),dimensionItemType]],rows[dimension,legendSet[id],filter,items[dimensionItem~rename(id),displayName~rename(name),dimensionItemType]],filters[dimension,legendSet[id],filter,items[dimensionItem~rename(id),displayName~rename(name),dimensionItemType]]`;
    return this.httpClient.get(url).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => of(error))
    );
  }

  fetchDashboardItemAnalyticsData() {
    const url = 'dataStore';

    return this.httpClient.get(url);
  }
}
