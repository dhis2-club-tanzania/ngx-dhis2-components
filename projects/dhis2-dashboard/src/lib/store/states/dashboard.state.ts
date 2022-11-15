import { Dashboard } from '../../models/dashboard.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { DashboardMode } from '../../constants/dashboard-modes.constant';

import { DashboardItem } from '../../models/dashboard-item.model';
import { BaseState, initialBaseState } from './base.state';

export interface DashboardState extends EntityState<Dashboard>, BaseState {
  currentDashboard: string;
  currentDashboardItem: DashboardItem;
  currentVisualization: string;
  dashboardMode: string;
  currentChartType: string;
  selectionsUpdatedForCurrentDashboard: boolean;
}

// export function sortByName(a: Dashboard, b: Dashboard): number {
//   return a.name.localeCompare(b.name);
// }

export const dashboardAdapter: EntityAdapter<Dashboard> =
  createEntityAdapter<Dashboard>({});

export const initialDashboardState: DashboardState =
  dashboardAdapter.getInitialState({
    ...initialBaseState,
    currentDashboard: '',
    currentDashboardItem: null,
    currentVisualization: '',
    dashboardMode: DashboardMode.VIEW,
    currentChartType: 'column',
    selectionsUpdatedForCurrentDashboard: false,
  });
