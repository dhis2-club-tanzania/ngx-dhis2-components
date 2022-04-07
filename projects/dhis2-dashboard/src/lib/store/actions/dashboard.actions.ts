import { createAction, props } from '@ngrx/store';
import { DashboardItem } from '../../models/dashboard-item.model';
import {
  Dashboard,
  VisualizationDetailsModel,
} from '../../models/dashboard.model';

export const loadDashboards = createAction(
  '[Dashboard] Load Dashboards',
  props<{ useDataStore: boolean; dataStoreKeyRef: string }>()
);

export const loadDashboardsFail = createAction(
  '[Dashboard] Load Dashboards fail',
  props<{ error: any }>()
);

export const addDashboards = createAction(
  '[Dashboard] Add Dashboards',
  props<{ dashboards: Dashboard[] }>()
);

export const upsertDashboard = createAction(
  '[Dashboard] Upsert Dashboard',
  props<{ dashboard: Dashboard }>()
);

export const createDashboard = createAction('[Dashboard] Create Dashboard');

export const initializeDashboardSave = createAction(
  '[Dashboard] Initialize dashboard save'
);

export const saveDashboard = createAction(
  '[Dashboard] Save Dashboard',
  props<{ dashboard: Dashboard; action: string; originalId: string }>()
);

export const saveDashboardSuccess = createAction(
  '[Dashboard] Save Dashboard Success',
  props<{ dashboard: Dashboard }>()
);

export const saveDashboardFail = createAction(
  '[Dashboard] Save Dashboard Fail',
  props<{ error: any; id?: string }>()
);

export const updateDashboard = createAction(
  '[Dashboard] Update Dashboard',
  props<{ dashboard: Dashboard }>()
);

export const removeDashboard = createAction(
  '[Dashboard] Remove Dashboard',
  props<{ id: string }>()
);

export const removeDashboardSuccess = createAction(
  '[Dashboard] Remove Dashboard Success',
  props<{ id: string }>()
);

export const removeDashboardFail = createAction(
  '[Dashboard] Remove Dashboard Fail',
  props<{ id: string; error: any }>()
);

export const setCurrentDashboard = createAction(
  '[Dashboard] Set current dashboard',
  props<{ id: string }>()
);

export const upsertCurrentDashboard = createAction(
  '[Dashboard] upsert current dashboard',
  props<{ id: string }>()
);

export const toggleDashboardMode = createAction(
  '[Dashboard] Toggle dashboard mode'
);

export const enableEditMode = createAction('[Dashboard] Enable edit mode');

export const enableViewMode = createAction('[Dashboard] Enable view mode');

export const upsertDashboardItem = createAction(
  '[Dashboard] add dashboard item',
  props<{ currentDashboardItem: any; dashboardId: string }>()
);

export const setCurrentDashboardItem = createAction(
  '[Dashboard] Set current dashboard item',
  props<{ currentDashboardItem: DashboardItem; dashboardId?: string }>()
);

export const removeDashboardItem = createAction(
  '[Dashboard] Remove Dashboard Item',
  props<{ dashboardId: string; dashboardItemId: string }>()
);

export const updateCurrentDashboardItemVisulizationType = createAction(
  '[Dshboard item] update visualization type',
  props<{ visulizationType: string }>()
);

export const updateCurrentChartType = createAction(
  '[Dshboard item] update current chart type',
  props<{ chartType: string }>()
);

export const loadVisualizationsConfigurations = createAction(
  '[Visualization] load visualization configs',
  props<{
    visualizationsDetails: VisualizationDetailsModel[];
  }>()
);

export const updateVisualizationsConfigs = createAction(
  '[Visualization] update visualization configs',
  props<{
    visualizationsDetails: VisualizationDetailsModel[];
  }>()
);

export const updateCurrentVisualizationSelections = createAction(
  '[Visualization] Update visualization selections',
  props<{ selections: any[]; dashboardId: string; dashboardItemId: string }>()
);

export const updateCurrentVisualizationType = createAction(
  '[Visualization] Update current dashboard item visualization type',
  props<{
    visualizationType: string;
    dashboardId: string;
    dashboardItemId: string;
  }>()
);
