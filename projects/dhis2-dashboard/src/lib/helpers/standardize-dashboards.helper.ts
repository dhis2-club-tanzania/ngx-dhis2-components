import { Dashboard } from '../models/dashboard.model';
import { standardizeDashboard } from './standardize-dashboard.helper';

export function standardizeDashboards(dashboards: any[]): Dashboard[] {
  return (dashboards || []).map(standardizeDashboard);
}
