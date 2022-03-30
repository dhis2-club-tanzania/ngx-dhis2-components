import { User } from '@iapps/ngx-dhis2-http-client';
import { DashboardAccess } from '../constants/dashboard-access.constant';
import { Dashboard } from '../models/dashboard.model';

export function getNewDashboard(currentUser: User): Dashboard {
  return {
    id: 'new',
    name: '',
    dashboardItems: [],
    user: currentUser ? { id: currentUser.id } : null,
    publicAccess: DashboardAccess.NO_ACCESS,
    externalAccess: false,
  };
}
