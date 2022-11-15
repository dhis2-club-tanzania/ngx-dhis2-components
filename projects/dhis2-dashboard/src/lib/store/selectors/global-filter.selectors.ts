import {
  createSelector,
  MemoizedSelector,
  createFeatureSelector,
} from '@ngrx/store';

import { getCurrentDashboardId } from './dashboard-selectors';
import {
  GlobalFilter,
  GlobalFilterState,
  globalFilterAdapter,
} from '../states/global-filter.state';

export const getGlobalFilterState: MemoizedSelector<object, GlobalFilterState> =
  createFeatureSelector<GlobalFilterState>('globalFilter');

export const { selectEntities: getGlobalFilterEntities } =
  globalFilterAdapter.getSelectors(getGlobalFilterState);

export const getCurrentGlobalDataSelections = createSelector(
  getCurrentDashboardId,
  getGlobalFilterEntities,
  (
    dashboardId: string,
    globalFilterEntities: { [id: string]: GlobalFilter }
  ) => {
    const currentGlobalFilter = globalFilterEntities
      ? globalFilterEntities[dashboardId]
      : null;

    return currentGlobalFilter ? currentGlobalFilter.dataSelections : [];
  }
);
