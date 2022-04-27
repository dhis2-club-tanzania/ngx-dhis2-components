import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { DashboardVisualizationItemComponent } from '../dashboard-visualization-item/dashboard-visualization-item.component';
import { orderBy } from 'lodash';
import {
  loadVisualizationsConfigurations,
  updateCurrentVisualizationSelections,
} from '../../store/actions/dashboard.actions';
import { DashboardAppState } from '../../store/reducers';
import { Store } from '@ngrx/store';

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
  constructor(private store: Store<DashboardAppState>) {}

  ngOnInit(): void {
    this.store.dispatch(
      loadVisualizationsConfigurations({
        visualizationsDetails: this.dashboardItems.map((dashboardItem) => {
          return {
            dashboardId: dashboardItem?.dashboardId,
            dashboardItemId: dashboardItem?.id,
            visId: dashboardItem?.visualization?.id,
          };
        }),
      })
    );
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
    console.log('the items');
    console.log(this.dashboardItems);
    console.log(selections);
    this.selections = selections;
    this.store.dispatch(
      updateCurrentVisualizationSelections({
        selections,
        dashboardId: this.dashboardItems[0]?.dashboardId,
        dashboardItemId: this.currentDashboardItemId,
      })
    );
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

  onGraphTypeUpdate(event: any) {
    // event.stopPropagation();

    console.log('the configs on DashIteLis');
    console.log(event);

    (this.visualizationComponents.filter(
      (vizComponent) =>
        vizComponent?.dashboardItemConfig?.id === event?.itemId
    ) || [])[0].updateVisualizationObjectParameters(null, event?.type);
    // this.showFilterSelections = false;
  }

  onGetSelectionDimensions(selections: any[]): void {
    this.selections = selections;
  }
}
