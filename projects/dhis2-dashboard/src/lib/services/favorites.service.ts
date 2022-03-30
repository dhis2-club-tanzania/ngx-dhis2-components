import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DashboardItem } from '../models/dashboard-item.model';

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
}
