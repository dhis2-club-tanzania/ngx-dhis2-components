import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'menuItemsControl',
})
export class MenuItemsControlPipe implements PipeTransform {
  transform(dashboards: any[], index): any {
    if (index === '0') {
      return dashboards.slice(0, 7);
    } else if (index === 'all') {
      return dashboards;
    } else {
      return dashboards.slice(0, 7);
    }
  }
}
