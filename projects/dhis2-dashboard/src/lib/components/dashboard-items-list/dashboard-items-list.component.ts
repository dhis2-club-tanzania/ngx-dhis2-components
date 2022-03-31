import { Component, Input, OnInit } from '@angular/core';
import { omit } from 'lodash';

@Component({
  selector: 'app-dashboard-items-list',
  templateUrl: './dashboard-items-list.component.html',
  styleUrls: ['./dashboard-items-list.component.css'],
})
export class DashboardItemsListComponent implements OnInit {
  @Input() dashboardItems: any[];
  itemsToShowFilters: any = {};
  currentFilterType: string = 'PERIOD';
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
    this.currentFilterType = filterType;
  }
}
