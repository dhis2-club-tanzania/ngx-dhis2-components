import { Injectable } from '@angular/core';
import { ErrorMessage } from '@iapps/ngx-dhis2-http-client';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { concatMap, tap, withLatestFrom } from 'rxjs/operators';

import { IndicatorService } from '../../services/indicator.service';
import {
  addIndicators,
  loadIndicators,
  loadIndicatorsFail,
  loadIndicatorsInitiated
} from '../actions/indicator.actions';
import { IndicatorState } from '../reducers/indicator.reducer';
import { getIndicatorsInitiatedStatus } from '../selectors/indicator.selectors';

@Injectable()
export class IndicatorEffects {
  
  loadIndicators$: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadIndicators),
        concatMap(action =>
          of(action).pipe(
            withLatestFrom(
              this.indicatorStore.select(getIndicatorsInitiatedStatus)
            )
          )
        ),
        tap(([action, indicatorInitiated]) => {
          if (!indicatorInitiated) {
            this.indicatorStore.dispatch(loadIndicatorsInitiated());
            this.indicatorService.loadAll().subscribe(
              (indicators: any[]) => {
                this.indicatorStore.dispatch(addIndicators({ indicators }));
              },
              (error: ErrorMessage) => {
                this.indicatorStore.dispatch(loadIndicatorsFail({ error }));
              }
            );
          }
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private indicatorService: IndicatorService,
    private indicatorStore: Store<IndicatorState>
  ) {}
}
