import { createReducer, on } from '@ngrx/store';

import {
  addDashboards,
  loadDashboards,
  loadDashboardsFail,
  removeDashboardSuccess,
  saveDashboard,
  setCurrentDashboard,
  updateDashboard,
  toggleDashboardMode,
  enableEditMode,
  enableViewMode,
  upsertDashboard,
  saveDashboardSuccess,
  saveDashboardFail,
  upsertDashboardItem,
  removeDashboardItem,
  setCurrentDashboardItem,
  updateCurrentDashboardItemVisulizationType,
  upsertCurrentDashboard,
  updateCurrentChartType,
} from '../actions/dashboard.actions';
import {
  dashboardAdapter,
  DashboardState,
  initialDashboardState,
} from '../states/dashboard.state';
import { DashboardMode } from '../../constants/dashboard-modes.constant';
import { Dashboard } from '../../models/dashboard.model';
import { find, slice } from 'lodash';
import {
  setChartTypeOnCurrentDashboardItem,
  updateVisualizationTypeOnCurrentDashboardItem,
} from '../../helpers/update-chart-visualization-type.helper';
import {
  errorBaseState,
  loadedBaseState,
  loadingBaseState,
} from '../states/base.state';

const reducer = createReducer(
  initialDashboardState,
  on(loadDashboards, (state) => ({
    ...state,
    ...loadingBaseState,
  })),
  on(addDashboards, (state, { dashboards }) => {
    console.log('dashboards', dashboards);
    console.log('state', state);
    return dashboardAdapter.addMany(dashboards, {
      ...state,
      ...loadedBaseState,
    });
  }),
  on(upsertDashboard, (state, { dashboard }) =>
    dashboardAdapter.upsertOne(dashboard, {
      ...state,
      currentDashboard: dashboard.id,
    })
  ),
  on(saveDashboard, (state, { originalId, dashboard }) =>
    dashboardAdapter.updateOne(
      { id: originalId, changes: dashboard },
      { ...state, dashboardMode: DashboardMode.SAVE }
    )
  ),
  on(saveDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    dashboardMode: DashboardMode.VIEW,
  })),
  on(saveDashboardFail, (state) => ({
    ...state,
    dashboardMode: DashboardMode.VIEW,
  })),
  on(updateDashboard, (state, { dashboard }) =>
    dashboardAdapter.updateOne({ id: dashboard.id, changes: dashboard }, state)
  ),
  on(removeDashboardSuccess, (state, { id }) =>
    dashboardAdapter.removeOne(id, state)
  ),
  on(loadDashboardsFail, (state, { error }) => ({
    ...state,
    ...errorBaseState,
    error,
  })),
  on(setCurrentDashboard, (state, { id }) => ({
    ...state,
    currentDashboard: id,
  })),
  on(upsertCurrentDashboard, (state, { id }) => ({
    ...state,
    currentDashboard: id,
  })),
  on(toggleDashboardMode, (state) => ({
    ...state,
    dashboardMode:
      state.dashboardMode === DashboardMode.VIEW
        ? DashboardMode.EDIT
        : DashboardMode.VIEW,
  })),
  on(enableEditMode, (state) => ({
    ...state,
    dashboardMode: DashboardMode.EDIT,
  })),
  on(enableViewMode, (state) => ({
    ...state,
    dashboardMode: DashboardMode.VIEW,
  })),
  on(
    setCurrentDashboardItem,
    (state, { currentDashboardItem, dashboardId }) => ({
      ...state,
      currentDashboardItem,
      currentDashboard: dashboardId || state.currentDashboard,
    })
  ),
  on(upsertDashboardItem, (state, { dashboardId, currentDashboardItem }) => {
    const dashboard = state.entities[dashboardId];

    if (!dashboard) {
      return state;
    }

    const availableDashboardItem = find(dashboard.dashboardItems, [
      'id',
      currentDashboardItem.id,
    ]);

    const dashboardItemIndex = dashboard.dashboardItems.indexOf(
      availableDashboardItem
    );

    return dashboardAdapter.updateOne(
      {
        id: dashboard.id,
        changes: {
          dashboardItems:
            dashboardItemIndex !== -1
              ? [
                  ...slice(dashboard.dashboardItems, 0, dashboardItemIndex),
                  currentDashboardItem,
                  ...slice(dashboard.dashboardItems, dashboardItemIndex + 1),
                ]
              : [currentDashboardItem, ...dashboard.dashboardItems],
        },
      },
      {
        ...state,
        currentDashboardItem,
      }
    );
  }),
  on(removeDashboardItem, (state, { dashboardItemId, dashboardId }) => {
    const dashboard = state.entities[dashboardId];

    if (!dashboard) {
      return state;
    }

    const availableDashboardItem = find(dashboard.dashboardItems, [
      'id',
      dashboardItemId,
    ]);

    const dashboardItemIndex = dashboard.dashboardItems.indexOf(
      availableDashboardItem
    );

    return dashboardAdapter.updateOne(
      {
        id: dashboard.id,
        changes: {
          dashboardItems:
            dashboardItemIndex !== -1
              ? [
                  ...slice(dashboard.dashboardItems, 0, dashboardItemIndex),
                  ...slice(dashboard.dashboardItems, dashboardItemIndex + 1),
                ]
              : dashboard.dashboardItems,
        },
      },
      {
        ...state,
        currentDashboardItem: null,
      }
    );
  }),
  on(
    updateCurrentDashboardItemVisulizationType,
    (state, { visulizationType }) => ({
      ...state,
      currentDashboardItem: updateVisualizationTypeOnCurrentDashboardItem(
        visulizationType,
        state.currentDashboardItem
      ),
    })
  ),
  on(updateCurrentChartType, (state, { chartType }) => ({
    ...state,
    currentChartType: chartType,
  }))
);

export function dashboardReducer(state, action): DashboardState {
  return reducer(state, action);
}
