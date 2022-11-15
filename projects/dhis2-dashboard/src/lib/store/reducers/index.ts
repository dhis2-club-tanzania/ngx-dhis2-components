import { ActionReducerMap } from '@ngrx/store';
import { DashboardState } from '../states/dashboard.state';
import { GlobalFilterState } from '../states/global-filter.state';
import { SystemInfoState } from '../states/system-info.state';
import { UserState } from '../states/user.state';
// import { dashboardReducer } from './dashboard.reducer';
// import { globalFilterReducer } from './global-filter.reducer';
// import { systemInfoReducer } from './system-info.reducer';
// import { userReducer } from './user.reducer';

export interface DashboardAppState {
  dashboardUser: UserState;
  dashboard: DashboardState;
  systemInfo: SystemInfoState;
  globalFilter: GlobalFilterState;
}
