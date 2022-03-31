import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { omit } from 'lodash';
import { DashboardVisualizationItemComponent } from '../dashboard-visualization-item/dashboard-visualization-item.component';

@Component({
  selector: 'app-dashboard-items-list',
  templateUrl: './dashboard-items-list.component.html',
  styleUrls: ['./dashboard-items-list.component.css'],
})
export class DashboardItemsListComponent implements OnInit {
  @Input() dashboardItems: any[];
  itemsToShowFilters: any = {};
  currentFilterType: string = 'PERIOD';
  selections: any[];
  showFilterSelections: boolean = true;
  shouldRenderAnItem: boolean = true;

  @ViewChild(DashboardVisualizationItemComponent, { static: false })
  visualizationComponent: DashboardVisualizationItemComponent;

  constructor() {}

  ngOnInit(): void {}

  toggleFilters(event: Event, itemId: string): void {
    event.stopPropagation();
    if (!this.itemsToShowFilters[itemId]) {
      this.itemsToShowFilters[itemId] = itemId;
    } else {
      this.itemsToShowFilters = omit(this.itemsToShowFilters, itemId);
    }
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

  onUpdate(event: Event, selections: any[]): void {
    event.stopPropagation();
    this.visualizationComponent.loadDashboardItemConfigs(selections);
    this.showFilterSelections = false;
  }
}
