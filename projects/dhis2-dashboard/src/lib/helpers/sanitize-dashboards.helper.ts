export function sanitizeDashboards(dashboards: any[]) {
  return dashboards.map((dashboard) => {
    return {
      ...dashboard,
      dashboardItems: dashboard?.dashboardItems.map((dashboardItem) => {
        console.log(dashboardItem);
        return {
          ...dashboardItem,
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
