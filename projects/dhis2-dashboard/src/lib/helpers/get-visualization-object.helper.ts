import { DashboardItem } from '../models/dashboard-item.model';

export function getVisualizationObject(dashboardItem: DashboardItem): any {
  if (!dashboardItem) {
    return null;
  }

  const { visualization, type, created, lastUpdated, appKey } = dashboardItem;

  return {
    id: dashboardItem.id,
    name: visualization ? visualization.name : 'Untitled',
    type,
    currentType: type,
    created,
    lastUpdated,
    appKey,
    progress: {
      statusCode: 200,
      statusText: 'OK',
      percent: 0,
      message: visualization?.name
        ? `Loading Data for ${visualization?.name}....`
        : '',
    },
    uiConfig: {},
    layers: [],
  };
}
