export function sanitizeDashboards(dashboards: any[]) {
  return dashboards.map((dashboard) => {
    return {
      ...dashboard,
      dashboardItems: dashboard?.dashboardItems.map((dashboardItem) => {
        return {
          ...dashboardItem,
          visualization:
            dashboardItem?.type === 'CHART'
              ? dashboardItem?.chart
              : dashboardItem?.type === 'MAP'
              ? dashboardItem?.map
              : dashboardItem?.type === 'REPORT_TABLE'
              ? dashboardItem?.reports
              : null,
        };
      }),
    };
  });
}
