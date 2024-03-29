import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { IndicatorsService } from '../../services/indicators.service';
import {
  IndicatorsAction,
  IndicatorsActions,
  LoadIndicatorGroupsFailAction,
  LoadIndicatorGroupsSuccessAction,
  LoadIndicatorsByPagesSuccessAction,
  loadIndicatorsFailAction,
  loadIndicatorsSuccessAction,
  LoadProgramIndicatorGroupsFailAction,
  LoadProgramIndicatorGroupsSuccessAction,
  LoadProgramIndicatorsByPagesSuccessAction,
  loadProgramIndicatorsSuccessAction,
} from '../actions/indicators.actions';
import { IndicatorGroupsState } from '../state/indicators.state';

@Injectable()
export class IndicatorsEffects {
  
  programIndicatorsList$: Observable<any> = createEffect(() => this.actions$.pipe(
    ofType<IndicatorsAction>(IndicatorsActions.LoadProgramIndicators),
    switchMap(() =>
      this.httpClient.get('programIndicators.json?paging=false').pipe(
        map(
          (programIndicatorsListObject: any) =>
            new loadProgramIndicatorsSuccessAction(programIndicatorsListObject)
        ),
        catchError((error) => of(new loadIndicatorsFailAction(error)))
      )
    )
  ));

  
  indicatorGroups$: Observable<any> = createEffect(() => this.actions$.pipe(
    ofType<IndicatorsAction>(IndicatorsActions.LoadIndicatorGroups),
    switchMap(() =>
      this.httpClient
        .get(
          'indicatorGroups.json?fields=id,name,description,indicators[id]&paging=false'
        )
        .pipe(
          map(
            (indicatorGroupsObject: IndicatorGroupsState) =>
              new LoadIndicatorGroupsSuccessAction(indicatorGroupsObject)
          ),
          catchError((error) => of(new LoadIndicatorGroupsFailAction(error)))
        )
    )
  ));

  
  ProgramIndicatorGroups$: Observable<any> = createEffect(() => this.actions$.pipe(
    ofType<IndicatorsAction>(IndicatorsActions.LoadProgramIndicatorGroups),
    switchMap(() =>
      this.httpClient
        .get(
          'programIndicatorGroups.json?fields=id,name,programIndicators[id]&paging=false'
        )
        .pipe(
          map(
            (programIndicatorGroupsObject: any) =>
              new LoadProgramIndicatorGroupsSuccessAction(
                programIndicatorGroupsObject
              )
          ),
          catchError((error) =>
            of(new LoadProgramIndicatorGroupsFailAction(error))
          )
        )
    )
  ));

  
  programIndicator$: Observable<any> = createEffect(() => this.actions$.pipe(
    ofType<IndicatorsAction>(IndicatorsActions.LoadProgramIndicatorsSuccess),
    tap((action: any) => {
      let programIndicatorsArr: any[] = [];
      this.indicatorService
        ._loadAllProgramIndicators(action.payload.pager)
        .subscribe((allIndicators) => {
          programIndicatorsArr = [
            ...programIndicatorsArr,
            ...allIndicators.programIndicators,
          ];
          this.store.dispatch(
            new LoadProgramIndicatorsByPagesSuccessAction(programIndicatorsArr)
          );
        });
    })
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private httpClient: NgxDhis2HttpClientService,
    private indicatorService: IndicatorsService
  ) {}
}
