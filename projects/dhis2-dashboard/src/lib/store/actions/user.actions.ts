import { createAction, props } from '@ngrx/store';

export enum UserActionTypes {
  LoadCurrentUser = '[User] Load current User',
  AddCurrentUser = '[User] Add Current User',
  LoadCurrentUserFail = '[User] Load Current User fail',
}

export const loadCurrentUser = createAction(
  '[User] Load current User',
  props<{ systemInfo: any }>()
);

export const addCurrentUser = createAction(
  '[User] Add Current User',
  props<{ currentUser: any; systemInfo: any }>()
);

export const loadCurrentUserFail = createAction(
  '[User] Load Current User fail',
  props<{ error: any }>()
);
