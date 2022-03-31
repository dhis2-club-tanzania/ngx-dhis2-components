import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Dashboard } from '../models/dashboard.model';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { sanitizeDashboards } from '../helpers/sanitize-dashboards.helper';
import { keyBy } from 'lodash';

const dashboardApiFields =
  'fields=id,name,user[id,name],description,access,created,lastUpdated,' +
  'favorite,dashboardItems[id,type,height,width,x,y,shape,map[id,name],' +
  'chart[id,name],eventChart[id,name],reportTable[id,name],resources[id,name],' +
  'reports[id,name],messages[id,name]],favorites&pageSize=5';
const dashboardApiNamespace = 'dashboards';
@Injectable()
export class DashboardService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getAll() {
    return this.httpClient
      .get(`${dashboardApiNamespace}?${dashboardApiFields}`)
      .pipe(
        map((dashboardResponse: any) =>
          dashboardResponse.dashboards
            ? sanitizeDashboards(dashboardResponse.dashboards)
            : [] || []
        )
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
    const chartUrl = `visualizations/${chartId}.json?fields=id,type,dataElementDimensions,displayName~rename(name),displayDescription~rename(description),columns[dimension,legendSet[id],filter,items[dimensionItem~rename(id),displayName~rename(name),dimensionItemType]],rows[dimension,legendSet[id],filter,items[dimensionItem~rename(id),displayName~rename(name),dimensionItemType]],filters[dimension,legendSet[id],filter,items[dimensionItem~rename(id),displayName~rename(name),dimensionItemType]]`;

    return this.httpClient.get(chartUrl);
  }

  getVisualizationsConfigs(item: any, selections?: any[]): Observable<any> {
    const url = `${item?.type.toLowerCase()}s/${
      item?.visualization?.id
    }.json?fields=id,name,type,dataElementDimensions,displayName~rename(name),displayDescription~rename(description),columns[dimension,legendSet[id],filter,items[dimensionItem~rename(id),displayName~rename(name),dimensionItemType]],rows[dimension,legendSet[id],filter,items[dimensionItem~rename(id),displayName~rename(name),dimensionItemType]],filters[dimension,legendSet[id],filter,items[dimensionItem~rename(id),displayName~rename(name),dimensionItemType]]`;
    return this.httpClient.get(url).pipe(
      map((response) => {
        console.log(selections);
        console.log(response);
        const selectionsKeyedByDimensions = keyBy(selections, 'dimension');
        return !selections
          ? response
          : {
              ...response,
              filters: response?.filters.map((visFilter) => {
                if (selectionsKeyedByDimensions[visFilter?.dimension]) {
                  return {
                    ...visFilter,
                    items:
                      selectionsKeyedByDimensions[visFilter?.dimension]?.items,
                  };
                } else {
                  return visFilter;
                }
              }),
              rows: response?.rows.map((row) => {
                if (selectionsKeyedByDimensions[row?.dimension]) {
                  return {
                    ...row,
                    items: selectionsKeyedByDimensions[row?.dimension]?.items,
                  };
                } else {
                  return row;
                }
              }),
              columns: response?.columns.map((column) => {
                if (selectionsKeyedByDimensions[column?.dimension]) {
                  return {
                    ...column,
                    items:
                      selectionsKeyedByDimensions[column?.dimension]?.items,
                  };
                } else {
                  return column;
                }
              }),
            };
      }),
      catchError((error) => of(error))
    );
  }

  fetchDashboardItemAnalyticsData() {
    const url = 'dataStore';

    return this.httpClient.get(url);
  }
}
