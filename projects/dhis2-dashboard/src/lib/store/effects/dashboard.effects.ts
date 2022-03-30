import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DashboardService } from '../../services/dashboard.service';
import {
  addDashboards,
  loadDashboards,
  loadDashboardsFail,
} from '../actions/dashboard.actions';
import { DashboardState } from '../states/dashboard.state';

@Injectable()
export class DashboardEffects implements OnInitEffects {
  loadDashboards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDashboards),
      switchMap(() => {
        return this.dashboardService.getAll().pipe(
          map((response) => {
            return addDashboards({ dashboards: response });
          }),
          catchError((error) => of(loadDashboardsFail({ error })))
        );
      })
    )
  );

  ngrxOnInitEffects(): Action {
    return loadDashboards();
  }

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService
  ) {}
}
