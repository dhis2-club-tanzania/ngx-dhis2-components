import { createSelector } from '@ngrx/store';

import { getRootState, DashboardState } from '../reducers';
import { SystemInfoState } from '../states/system-info.state';

export const getSystemInfoState = createSelector(
  getRootState,
  (state: DashboardState) => state.systemInfo
);

export const getSystemInfo = createSelector(
  getSystemInfoState,
  (state: SystemInfoState) => state.systemInfo
);

export const getSystemInfoLoading = createSelector(
  getSystemInfoState,
  (state: SystemInfoState) => state.loading
);

export const getSystemInfoLoaded = createSelector(
  getSystemInfoState,
  (state: SystemInfoState) => state.loaded
);

export const getSystemInfoLoadingError = createSelector(
  getSystemInfoState,
  (state: SystemInfoState) => state.error
);
