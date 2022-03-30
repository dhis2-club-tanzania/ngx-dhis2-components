export function updateVisualizationTypeOnCurrentDashboardItem(
  visualizationType,
  currentDashboardItem
) {
  let layers = currentDashboardItem?.visualization.layers;
  let visualization;
  if (layers) {
    layers = currentDashboardItem?.visualization.layers.map((layer) => {
      return {
        ...layer,
        config: { ...layer?.config, type: visualizationType },
      };
    });
    visualization = { ...currentDashboardItem?.visualization, layers };
  } else {
    visualization = {
      ...currentDashboardItem?.visualization,
      type: visualizationType,
    };
  }

  return {
    ...currentDashboardItem,
    visualization: visualization,
  };
}

export function setChartTypeOnCurrentDashboardItem(
  chartType,
  currentDashboardItem
) {
  return {
    ...currentDashboardItem,
    visualization: {
      ...currentDashboardItem.visualization,
      type: chartType,
    },
  };
}
