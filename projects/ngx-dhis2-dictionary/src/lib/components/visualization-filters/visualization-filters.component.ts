import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrgUnitFilterConfig } from '@iapps/ngx-dhis2-org-unit-filter';
import { PeriodFilterConfig } from '@iapps/ngx-dhis2-period-filter';

@Component({
  selector: 'lib-visualization-filters',
  templateUrl: './visualization-filters.component.html',
  styleUrls: ['./visualization-filters.component.css'],
})
export class VisualizationFiltersComponent implements OnInit {
  @Input() filterType: string;
  @Input() dimensionSelections: any[];

  /** For Period Filter */
  periodObject: any;
  action: string;
  periodFilterConfig: PeriodFilterConfig = {
    singleSelection: false,
    emitOnSelection: true,
    childrenPeriodSortOrder: 'ASC',
    allowDateRangeSelection: true,
    allowRelativePeriodSelection: true,
    allowFixedPeriodSelection: true,
    hideActionButtons: true,
    contentHeight: '300px',
  };
  selectedPeriodItems: any[] = [];

  /** For Org Unit Filter */
  orgUnitObject: any;
  orgUnitFilterConfig: OrgUnitFilterConfig = {
    singleSelection: false,
    showOrgUnitLevelGroupSection: true,
    showUserOrgUnitSection: true,
    reportUse: true,
    emitOnSelection: true,
    hideActionButtons: true,
    minLevel: 4,
  };
  selectedOrgUnitItems: any[];
  @Output() selections = new EventEmitter<any[]>();
  constructor() {}

  ngOnInit(): void {
    this.selectedPeriodItems = (this.dimensionSelections.filter(
      (selection) => selection?.dimension == 'pe'
    ) || [])[0]?.items;
    this.selectedOrgUnitItems = (this.dimensionSelections.filter(
      (selection) => selection?.dimension == 'ou'
    ) || [])[0]?.items;
  }

  onPeriodUpdate(periodObject: any, action: string): void {
    this.periodObject = periodObject;
    this.selectedPeriodItems = periodObject?.items;
    this.action = action;
    let selections = [];
    selections = this.periodObject
      ? [
          ...selections,
          {
            dimension: 'pe',
            dimensionItemType: 'PERIOD',
            action: this.action,
            items: this.selectedPeriodItems,
          },
        ]
      : selections;
    selections = this.orgUnitObject
      ? [
          ...selections,
          {
            dimension: 'ou',
            dimensionItemType: 'OU',
            action: this.action,
            items: this.selectedOrgUnitItems,
          },
        ]
      : selections;
    this.selections.emit(selections);
  }

  onOrgUnitUpdate(orgUnitObject: any, action: string): void {
    this.orgUnitObject = orgUnitObject;
    this.selectedOrgUnitItems = this.orgUnitObject?.items;
    let selections = [];
    this.action = action;
    selections = this.periodObject
      ? [
          ...selections,
          {
            dimension: 'pe',
            action: this.action,
            items: this.selectedPeriodItems,
          },
        ]
      : selections;
    selections = this.orgUnitObject
      ? [
          ...selections,
          {
            dimension: 'ou',
            action: this.action,
            items: this.selectedOrgUnitItems,
          },
        ]
      : selections;
    this.selections.emit(selections);
  }
}
