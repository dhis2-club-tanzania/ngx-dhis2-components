export function sanitizeDashboards(dashboards: any[]) {
  return dashboards.map((dashboard) => {
    return {
      ...dashboard,
      dashboardItems: dashboard?.dashboardItems.map((dashboardItem) => {
        return {
          ...dashboardItem,
          dashboardId: dashboard?.id,
          visualization: !dashboardItem?.visualization
            ? dashboardItem?.type === 'CHART'
              ? dashboardItem?.chart
              : dashboardItem?.type === 'MAP'
              ? dashboardItem?.map
              : dashboardItem?.type === 'REPORT_TABLE'
              ? dashboardItem?.reportTables
              : null
            : dashboardItem?.visualization,
        };
      }),
    };
  });
}
