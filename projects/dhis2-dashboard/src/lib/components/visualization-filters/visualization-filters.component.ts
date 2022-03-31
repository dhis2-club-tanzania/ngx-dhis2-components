import { Component, Input, OnInit } from '@angular/core';
import { OrgUnitFilterConfig } from '@iapps/ngx-dhis2-org-unit-filter';
import { PeriodFilterConfig } from '@iapps/ngx-dhis2-period-filter';

@Component({
  selector: 'lib-visualization-filters',
  templateUrl: './visualization-filters.component.html',
  styleUrls: ['./visualization-filters.component.css'],
})
export class VisualizationFiltersComponent implements OnInit {
  @Input() filterType: string;

  /** For Period Filter */
  periodObject: any;
  action: string;
  periodFilterConfig: PeriodFilterConfig = {
    singleSelection: true,
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
    singleSelection: true,
    showOrgUnitLevelGroupSection: true,
    showUserOrgUnitSection: true,
    reportUse: true,
    emitOnSelection: true,
    hideActionButtons: true,
    minLevel: 4,
  };
  selectedOrgUnitItems: any[];
  constructor() {}

  ngOnInit(): void {}

  onPeriodUpdate(periodObject: any, action: string): void {
    console.log('CHEC+K :: ', periodObject);
    this.periodObject = periodObject;
    this.action = action;
  }

  onOrgUnitUpdate(orgUnitObject: any, action: string): void {
    this.orgUnitObject = orgUnitObject;
    console.log('or', this.orgUnitObject);
    this.action = action;
  }
}
