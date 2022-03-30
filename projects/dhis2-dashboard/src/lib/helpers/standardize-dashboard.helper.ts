import { Dashboard } from '../models/dashboard.model';
import { standardizeDashboardItem } from './standardize-dashboard-item.helper';

export function standardizeDashboard(dashboard: any): Dashboard {
  if (!dashboard) {
    return null;
  }
  return {
    ...dashboard,
    dashboardItems: (
      sanitizeDashboardItems(dashboard.dashboardItems).filter(
        (item) => item?.visualization?.type !== 'SINGLEVALUE'
      ) || []
    ).map(standardizeDashboardItem),
  };
}

export function standardizeListDashboardItem(dashboard: any): Dashboard {
  if (!dashboard) {
    return null;
  }
  return (
    sanitizeDashboardItems(dashboard.dashboardItems).filter(
      (item) => item?.visualization?.type === 'SINGLEVALUE'
    ) || []
  ).map(standardizeDashboardItem);
}

function sanitizeDashboardItems(items) {
  return items.map((item) => {
    if (!item.visualization.layers) {
      return item;
    } else {
      return {
        ...item,
        visualization: {
          currentType: item?.visualization?.currentType,
          id: item?.visualization?.id,
          type:
            item?.visualization.layers.length > 0
              ? item?.visualization.layers[0]?.config?.type
              : 'CHART',
          uiConfig: item?.visualization?.uiConfig,
          dimensions:
            item?.visualization.layers.length > 0
              ? item?.visualization.layers[0]?.dataSelections
              : [],
          name: item?.visualization?.name,
        },
      };
    }
  });
}
