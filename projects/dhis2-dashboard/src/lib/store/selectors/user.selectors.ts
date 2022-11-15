import { User } from '@iapps/ngx-dhis2-http-client';
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';

import { UserState } from '../states/user.state';

const getUserState: MemoizedSelector<object, UserState> =
  createFeatureSelector<UserState>('dashboardUser');

export const getCurrentUser = createSelector(
  getUserState,
  (state: UserState) => state.currentUser
);

export const getCurrentUserLoading = createSelector(
  getUserState,
  (state: UserState) => state.loading
);

export const getCurrentUserLoaded = createSelector(
  getUserState,
  (state: UserState) => state.loaded
);

export const getCurrentUserLoadingError = createSelector(
  getUserState,
  (state: UserState) => state.error
);

export const getCurrentUserManagementAuthoritiesStatus = createSelector(
  getCurrentUser,
  (currentUser: User) => {
    if (!currentUser) {
      return false;
    }

    return currentUser && currentUser.authorities
      ? currentUser.authorities.includes('ALL')
      : false;
  }
);
