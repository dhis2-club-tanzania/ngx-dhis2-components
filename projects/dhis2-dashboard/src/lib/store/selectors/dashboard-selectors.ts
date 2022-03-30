import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';

import { DashboardMode } from '../../constants/dashboard-modes.constant';
import { Dashboard } from '../../models/dashboard.model';
import { dashboardAdapter, DashboardState } from '../states/dashboard.state';
import { DashboardItem } from '../../models/dashboard-item.model';
import {
  standardizeDashboard,
  standardizeListDashboardItem,
} from '../../helpers/standardize-dashboard.helper';
import { standardizeDashboardItem } from '../../helpers/standardize-dashboard-item.helper';
import { flatten, intersection } from 'lodash';
import { getCurrentUser } from './user.selectors';

const getDashboardState: MemoizedSelector<object, DashboardState> =
  createFeatureSelector<DashboardState>('dashboard');

export const {
  selectEntities: getDashboardEntities,
  selectAll: getAllDashboards,
  selectIds: getDashboardIds,
} = dashboardAdapter.getSelectors(getDashboardState);

export const getDashboardMenuList = createSelector(
  getAllDashboards,
  getCurrentUser,
  (dashboards: Dashboard[], currentUser: any) => {
    // TODO: Find best way to softcode identification of dashboard given user organisationunit assignment
    const dashboardAssignment = {
      jxzwi8zXBBwPF: '52893cd1b8359/52893cd1ba688',
      qep40r08bg6zf: '52893cd1b8359/52893cd1ba688',
      EdPCdJoe67rJr: '52893cd1b8359/52f0a11563b5e',
      qNW24g5kcWB2V: '52893cd1b8359',
    };

    if (!currentUser) {
      return [];
    }

    return dashboards.filter((dashboard) => {
      const dashboardOrgUnitPath =
        dashboardAssignment[dashboard.id]?.split('/');

      const userOrgUnitPaths = (currentUser?.organisationUnits || [])
        .map((organisationUnit) => organisationUnit?.path || '')
        .join('/')
        .split('/')
        .filter((path) => path?.length > 0);

      return intersection(dashboardOrgUnitPath, userOrgUnitPaths).length > 0;
    });
  }
);

export const getCurrentDashboardId = createSelector(
  getDashboardState,
  (state: DashboardState) => state.currentDashboard
);

export const getCurrentChartType = createSelector(
  getDashboardState,
  (state: DashboardState) => state.currentChartType
);

export const getCurrentDashboard = (forAnalysis?: boolean) =>
  createSelector(
    getDashboardEntities,
    getCurrentDashboardId,
    (dashboardEntities: any, currentDashboardId) => {
      const dashboard = dashboardEntities
        ? dashboardEntities[currentDashboardId]
        : null;

      if (!dashboard) {
        return null;
      }

      return forAnalysis ? standardizeDashboard(dashboard) : dashboard;
    }
  );

export const getCurrentSingleValueDashboardItems = (forAnalysis?: boolean) =>
  createSelector(
    getDashboardEntities,
    getCurrentDashboardId,
    (dashboardEntities: any, currentDashboardId) => {
      const dashboard = dashboardEntities
        ? dashboardEntities[currentDashboardId]
        : null;

      if (!dashboard) {
        return null;
      }

      return forAnalysis ? standardizeListDashboardItem(dashboard) : dashboard;
    }
  );

export const getNextCurrentDashboardId = (currentId: string) =>
  createSelector(getDashboardIds, (dashboardIds: string[]) => {
    const currentIdIndex = dashboardIds.indexOf(currentId);

    return currentIdIndex !== 0
      ? dashboardIds[currentIdIndex - 1]
      : dashboardIds[currentIdIndex + 1];
  });

export const getDashboardItemsForCurrentDashboard = createSelector(
  getCurrentDashboard(true),
  (dashboard: Dashboard) => (dashboard ? dashboard.dashboardItems : [])
);

export const getDashboardMode = createSelector(
  getDashboardState,
  (state: DashboardState) => {
    const currentMode = state.dashboardMode;
    return {
      isViewMode: currentMode === DashboardMode.VIEW,
      isEditMode: currentMode === DashboardMode.EDIT,
      isSaveMode: currentMode === DashboardMode.SAVE,
    };
  }
);

export const getDashboardLoadingStatus = createSelector(
  getDashboardState,
  (state: DashboardState) => state.loading
);

export const getOverallDashboardLoadingStatus = createSelector(
  getDashboardLoadingStatus,
  (dashboardLoading: boolean) => dashboardLoading
);

export const getCurrentDashboardItem = (forAnalysis?: boolean) =>
  createSelector(getDashboardState, (dashboardState: DashboardState) => {
    const dashboardItem = dashboardState
      ? dashboardState.currentDashboardItem
      : null;
    if (!dashboardItem) {
      return null;
    }

    return forAnalysis
      ? standardizeDashboardItem(dashboardItem)
      : dashboardItem;
  });

export const getCurrentDashboardItemVisualizationDimensions = createSelector(
  getCurrentDashboardItem(),
  (dashboardItem: DashboardItem) => {
    if (!dashboardItem || !dashboardItem.visualization) {
      return [];
    }

    const layers = (dashboardItem.visualization as any).layers;

    if (layers) {
      return flatten(
        layers.map((layer: any) =>
          (layer.dataSelections || []).map((dataSelection) => {
            return {
              ...dataSelection,
              items: (dataSelection.items || []).map((item) => ({
                ...item,
                id: item.dimensionItem,
              })),
            };
          })
        )
      );
    }

    return (dashboardItem.visualization.dimensions || []).map((dimension) => {
      return {
        ...dimension,
        items: (dimension.items || []).map((item) => ({
          ...item,
          id: item.dimensionItem,
        })),
      };
    });
  }
);

export const checkIfAllVisualizationDimensionsSelected = createSelector(
  getCurrentDashboardItem(),
  (dashboardItem: DashboardItem) => {
    if (!dashboardItem || !dashboardItem.visualization) {
      return false;
    }

    const layers = (dashboardItem.visualization as any).layers;

    if (layers) {
      return true;
    }

    const visualizationDimensions =
      (dashboardItem.visualization.dimensions || [])
        .map((dimension) => {
          return {
            ...dimension,
            items: (dimension.items || []).map((item) => ({
              ...item,
              id: item.dimensionItem,
            })),
          };
        })
        .filter((vizDimension) => vizDimension?.items?.length > 0) || [];
    return visualizationDimensions?.length > 2 ? true : false;
  }
);
