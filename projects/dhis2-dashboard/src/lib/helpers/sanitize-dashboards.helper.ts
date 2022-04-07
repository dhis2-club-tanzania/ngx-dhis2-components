export function sanitizeDashboards(dashboards: any[]) {
  return dashboards.map((dashboard) => {
    return {
      ...dashboard,
      dashboardItems: dashboard?.dashboardItems.map((dashboardItem) => {
        return {
          ...dashboardItem,
          currentVisualizationType: dashboardItem?.type,
          dashboardId: dashboard?.id,
          visualization: !dashboardItem?.visualization
            ? dashboardItem?.type === 'CHART'
              ? {
                  ...dashboardItem?.chart,
                  currentVisualizationType: dashboardItem?.type,
                }
              : dashboardItem?.type === 'MAP'
              ? {
                  ...dashboardItem?.map,
                  currentVisualizationType: dashboardItem?.type,
                }
              : dashboardItem?.type === 'REPORT_TABLE'
              ? {
                  ...dashboardItem?.reportTables,
                  currentVisualizationType: dashboardItem?.type,
                }
              : dashboardItem?.type === 'TEXT'
              ? {
                  ...dashboardItem?.text,
                  currentVisualizationType: dashboardItem?.type,
                }
              : null
            : {
                ...dashboardItem?.visualization,
                currentVisualizationType: dashboardItem?.type,
              },
        };
      }),
    };
  });
}
