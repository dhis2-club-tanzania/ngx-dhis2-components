import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { find } from 'lodash';
import { Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  take,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import { getSelectedFunctionRule } from '../../helpers/get-selected-function-rule.helper';
import { getStandardizedFunctionRulesFromFunctionList } from '../../helpers/get-standardized-function-rule-from-function-list.helpers';
import { getStandardizedFunction } from '../../helpers/get-standardized-function.helper';
import { getStandardizedFunctions } from '../../helpers/get-standardized-functions.helper';
import { FunctionObject } from '../../models/function.model';
import { FunctionService } from '../../services/function.service';
import {
  addFunctions,
  loadFunctions,
  loadFunctionsFail,
  saveFunction,
  saveFunctionFails,
  saveFunctionSuccess,
  loadFunctionsInitialized
} from '../actions/function.actions';
import { FunctionState } from '../reducers/function.reducer';
import {
  getFunctionById,
  getFunctionInitiatedStatus
} from '../selectors/function.selectors';

@Injectable()
export class FunctionEffects {
  loadFunctions$: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadFunctions),
        concatMap(action =>
          of(action).pipe(
            withLatestFrom(
              this.functionStore.select(getFunctionInitiatedStatus)
            )
          )
        ),
        tap(([{ currentUser, routeParams }, functionInitiated]) => {
          if (!functionInitiated) {
            this.functionStore.dispatch(loadFunctionsInitialized());
            this.functionService.loadAll(currentUser).subscribe(
              (functions: FunctionObject[]) => {
                const standardizedFunctions = getStandardizedFunctions(
                  functions,
                  routeParams ? routeParams.function || '' : ''
                );
                const selectedFunction = find(standardizedFunctions, [
                  'selected',
                  true
                ]);

                const selectedRuleId = getSelectedFunctionRule(
                  selectedFunction.rules || [],
                  routeParams ? routeParams.rule || '' : ''
                );

                this.functionStore.dispatch(
                  addFunctions({
                    functions: standardizedFunctions,
                    functionRules: getStandardizedFunctionRulesFromFunctionList(
                      functions,
                      selectedRuleId
                    )
                  })
                );
              },
              (error: any) => {
                this.functionStore.dispatch(loadFunctionsFail({ error }));
              }
            );
          }
        })
      ),
    { dispatch: false }
  );

  
  saveFunction$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(saveFunction),
      mergeMap(({ functionObject, currentUser }) => {
        return this.functionStore
          .select(getFunctionById(functionObject ? functionObject.id : ''))
          .pipe(
            take(1),
            mergeMap((functionItem: FunctionObject) =>
              this.functionService.save(functionItem, currentUser).pipe(
                map((savedFunctionObject: FunctionObject) =>
                  saveFunctionSuccess({
                    functionObject: getStandardizedFunction(savedFunctionObject)
                  })
                ),
                catchError(error =>
                  of(saveFunctionFails({ functionObject, error }))
                )
              )
            )
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private functionService: FunctionService,
    private functionStore: Store<FunctionState>
  ) {}
}
