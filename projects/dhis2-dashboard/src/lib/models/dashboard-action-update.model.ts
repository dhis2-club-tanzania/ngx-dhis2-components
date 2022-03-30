import { Dashboard } from './dashboard.model';

export interface DashboardActionUpdate {
  type: string;
  dashboard: Dashboard;
}
