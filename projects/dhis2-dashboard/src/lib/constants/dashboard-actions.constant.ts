import { DashboardAction } from '../models/dashboard-action.model';

export enum DashboardActionType {
  RENAME = 'RENAME',
  DELETE = 'DELETE',
}

export const DASHBOARD_ACTIONS: DashboardAction[] = [
  {
    name: 'Edit',
    icon: 'edit',
    action: DashboardActionType.RENAME,
  },
  {
    name: 'Delete',
    icon: 'delete',
    action: DashboardActionType.DELETE,
  },
  {
    name: 'Share',
    icon: 'group',
    action: DashboardActionType.DELETE,
    hidden: true,
  },
];
