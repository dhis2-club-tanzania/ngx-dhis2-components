import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dashboard } from '../models/dashboard.model';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

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
        map((dashboardResponse: any) => dashboardResponse.dashboards || [])
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
}
