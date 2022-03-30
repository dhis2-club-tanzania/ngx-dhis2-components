import { DashboardItem } from '../models/dashboard-item.model';
import { getDashboardItemGridColumn } from './get-dashboard-item-grid-column.helper';
import { getVisualizationObject } from './get-visualization-object.helper';

export function standardizeDashboardItem(dashboardItem: any): DashboardItem {
  return dashboardItem
    ? {
        ...dashboardItem,
        gridColumn: getDashboardItemGridColumn(dashboardItem),
        currentType: dashboardItem.type,
        height: dashboardItem.height || '450px',
        visualization: getVisualizationObject(dashboardItem),
      }
    : null;
}
