import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { DashboardService } from '../../services/dashboard.service';
import { FavoritesService } from '../../services/favorites.service';
import {
  addDashboards,
  loadDashboards,
  loadDashboardsFail,
  loadVisualizationsConfigurations,
  setSelectionsUpdateState,
  updateVisualizationsConfigs,
} from '../actions/dashboard.actions';
import { DashboardAppState } from '../reducers';
import { getCurrentDashboardSelectionsUpdateState } from '../selectors/dashboard-selectors';

@Injectable()
export class DashboardEffects {
  loadDashboards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDashboards),
      switchMap((action) => {
        return this.dashboardService.getAll(action).pipe(
          map((response) => {
            return addDashboards({
              dashboards: response.map((dashboard, index) => {
                return {
                  ...dashboard,
                  index,
                };
              }),
            });
          }),
          catchError((error) => of(loadDashboardsFail({ error })))
        );
      })
    )
  );

  visualizationConfigs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadVisualizationsConfigurations),
      withLatestFrom(
        this.store.select(getCurrentDashboardSelectionsUpdateState)
      ),
      switchMap(([action, selectionUpdateState]: [any, boolean]) => {

        console.log("TODO: check")
        if (true) {
        // if (!selectionUpdateState) {
          return this.favoriteService
            .getVisualizationsConfigurations(action?.visualizationsDetails)
            .pipe(
              switchMap((response) => {
                return [
                  setSelectionsUpdateState({ updated: true }),
                  updateVisualizationsConfigs({
                    visualizationsDetails: response,
                  }),
                ];
              })
            );
        } else {
          return [setSelectionsUpdateState({ updated: true })];
        }
      })
    )
  );

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService,
    private favoriteService: FavoritesService,
    private store: Store<DashboardAppState>
  ) {}
}
