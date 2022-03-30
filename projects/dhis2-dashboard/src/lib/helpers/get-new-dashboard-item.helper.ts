import { DashboardItem } from '../models/dashboard-item.model';
import { generateUid } from './generate-uid.helper';

export function getNewDashboardItem(type: string): DashboardItem {
  return {
    id: generateUid(),
    type,
    shape: 'FULL_WIDTH',
    visualization: {
      id: generateUid(),
      name: 'Untitled',
      regressionType: 'NONE',
      type: 'COLUMN',
      dimensions: [
        {
          id: generateUid(),
          dimension: 'ou',
          layout: 'filters',
          items: [
            {
              id: generateUid(),
              dimensionItem: 'USER_ORGUNIT',
              dimensionItemType: 'USER_ORGANISATION_UNIT',
            },
          ],
        },
        {
          id: generateUid(),
          dimension: 'pe',
          layout: 'rows',
          items: [
            {
              id: generateUid(),
              dimensionItem: 'LAST_YEAR',
              dimensionItemType: 'PERIOD',
            },
          ],
        },
        {
          id: generateUid(),
          dimension: 'dx',
          layout: 'columns',
          items: [],
        },
      ],
    },
  };
}
