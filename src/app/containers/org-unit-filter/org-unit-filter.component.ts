import { Component, OnInit } from '@angular/core';
import { OrgUnitFilterConfig } from 'projects/ngx-dhis2-org-unit-filter/src/public-api';

@Component({
  selector: 'app-org-unit-filter',
  templateUrl: './org-unit-filter.component.html',
  styleUrls: ['./org-unit-filter.component.scss'],
})
export class OrgUnitFilterComponent implements OnInit {
  title = 'app';
  orgUnitObject: any;
  action: string;
  orgUnitFilterConfig: OrgUnitFilterConfig = {
    singleSelection: true,
    showOrgUnitLevelGroupSection: true,
    showUserOrgUnitSection: true,
    reportUse: true,
    emitOnSelection: true,
    hideActionButtons: true,
    minLevel: 4,
  };
  selectedOrgUnitItems: any[] = [
    {
      id: '52cd397580f17',
      created: '2014-01-08T11:41:41.000Z',
      lastUpdated: '2014-01-08T11:41:41.000Z',
      code: 'MOROHOSP',
      name: 'Morogoro Regional Hospital',
      shortName: 'MorogoroRegHosp',
      active: true,
      level: 4,
      path: '/52893cd1b8359/52893cd1ba688/52cd39714afac/52cd397580f17',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  onOrgUnitUpdate(orgUnitObject, action) {
    this.orgUnitObject = orgUnitObject;
    // console.log('or', this.orgUnitObject);
    this.action = action;
  }
}
