import { keyBy } from 'lodash';
export function updateVisualizationObject(
  visualizationObject: any,
  selections: any[]
) {
  const selectionsKeyedByDimensions = keyBy(selections, 'dimension');
  return {
    ...visualizationObject,
    filters: visualizationObject?.filters.map((visFilter) => {
      if (selectionsKeyedByDimensions[visFilter?.dimension]) {
        return {
          ...visFilter,
          items: selectionsKeyedByDimensions[visFilter?.dimension]?.items,
        };
      } else {
        return visFilter;
      }
    }),
    rows: visualizationObject?.rows.map((row) => {
      if (selectionsKeyedByDimensions[row?.dimension]) {
        return {
          ...row,
          items: selectionsKeyedByDimensions[row?.dimension]?.items,
        };
      } else {
        return row;
      }
    }),
    columns: visualizationObject?.columns.map((column) => {
      if (selectionsKeyedByDimensions[column?.dimension]) {
        return {
          ...column,
          items: selectionsKeyedByDimensions[column?.dimension]?.items,
        };
      } else {
        return column;
      }
    }),
  };
}
