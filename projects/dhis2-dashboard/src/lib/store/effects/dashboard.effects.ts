import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DashboardService } from '../../services/dashboard.service';
import { FavoritesService } from '../../services/favorites.service';
import {
  addDashboards,
  loadDashboards,
  loadDashboardsFail,
  loadVisualizationsConfigurations,
  updateVisualizationsConfigs,
} from '../actions/dashboard.actions';

@Injectable()
export class DashboardEffects {
  loadDashboards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDashboards),
      switchMap((action) => {
        return this.dashboardService.getAll(action).pipe(
          map((response) => {
            return addDashboards({ dashboards: response });
          }),
          catchError((error) => of(loadDashboardsFail({ error })))
        );
      })
    )
  );

  visualizationConfigs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadVisualizationsConfigurations),
      switchMap((action) => {
        return this.favoriteService
          .getVisualizationsConfigurations(action?.visualizationsDetails)
          .pipe(
            map((response) => {
              return updateVisualizationsConfigs({
                visualizationsDetails: response,
              });
            })
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService,
    private favoriteService: FavoritesService
  ) {}
}
