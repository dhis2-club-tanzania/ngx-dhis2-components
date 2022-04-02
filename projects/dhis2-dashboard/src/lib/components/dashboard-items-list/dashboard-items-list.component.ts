import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { omit } from 'lodash';
import { DashboardVisualizationItemComponent } from '../dashboard-visualization-item/dashboard-visualization-item.component';
import { orderBy } from 'lodash';

@Component({
  selector: 'app-dashboard-items-list',
  templateUrl: './dashboard-items-list.component.html',
  styleUrls: ['./dashboard-items-list.component.css'],
})
export class DashboardItemsListComponent implements OnInit {
  @Input() dashboardItems: any[];
  currentDashboardItemId: string;
  currentFilterType: string = 'PERIOD';
  selections: any[];
  showFilterSelections: boolean = true;
  shouldRenderAnItem: boolean = true;

  @ViewChildren('vizItem')
  visualizationComponents: QueryList<DashboardVisualizationItemComponent>;

  formattedDashboardItems: any[];
  constructor() {}

  ngOnInit(): void {
    // this.formattedDashboardItems = orderBy(
    //   this.dashboardItems,
    //   ['y', 'x'],
    //   ['asc', 'asc']
    // ).map((item) => {
    //   return {
    //     ...item,
    //     rows: item?.height,
    //     cols: item?.width,
    //   };
    // });
    // console.log(this.formattedDashboardItems);
  }

  toggleFilters(event: Event, itemId: string): void {
    event.stopPropagation();
    this.currentDashboardItemId =
      this.currentDashboardItemId == itemId ? null : itemId;
  }

  toggleFilterType(event: Event, filterType): void {
    event.stopPropagation();
    this.showFilterSelections = true;
    this.currentFilterType = filterType;
  }

  onGetSelections(selections: any[]): void {
    this.selections = selections;
  }

  onCancel(event: Event): void {
    event.stopPropagation();
    this.showFilterSelections = false;
  }

  onUpdate(
    event: Event,
    selections: any[],
    currentDashboardItemId: string
  ): void {
    event.stopPropagation();

    (this.visualizationComponents.filter(
      (vizComponent) =>
        vizComponent?.dashboardItemConfig?.id === currentDashboardItemId
    ) || [])[0].updateVisualizationObjectParameters(selections);
    this.showFilterSelections = false;
  }
}
