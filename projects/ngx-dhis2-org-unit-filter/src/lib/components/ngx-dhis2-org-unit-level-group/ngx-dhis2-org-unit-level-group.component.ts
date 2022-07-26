import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { OrgUnitFilterConfig } from '../../models/org-unit-filter-config.model';
import { OrgUnitGroup } from '../../models/org-unit-group.model';
import { OrgUnitLevel } from '../../models/org-unit-level.model';
import { OrgUnitTypes } from '../../constants/org-unit-types.constants';
import { MatSelectChange } from '@angular/material/select';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-dhis2-org-unit-level-group',
  templateUrl: './ngx-dhis2-org-unit-level-group.component.html',
  styleUrls: ['./ngx-dhis2-org-unit-level-group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxDhis2OrgUnitLevelGroupComponent implements OnInit {
  @Input() orgUnitLevels: OrgUnitLevel[];
  @Input() loadingLevels: boolean;
  @Input() loadingGroups: boolean;
  @Input() loadingOrgUnitGroupSets: boolean;
  @Input() orgUnitGroupSets: OrgUnitGroup[];
  @Input() orgUnitGroups: OrgUnitGroup[];
  @Input() height: string;

  @Input() orgUnitFilterConfig: OrgUnitFilterConfig;

  currentOrgUnitGroupSet: OrgUnitGroup;

  orgUnitGroupLevelSearchQuery: string;
  @Output() activateOrgUnitLevelOrGroup = new EventEmitter();
  @Output() deactivateOrgUnitLevelOrGroup = new EventEmitter();

  get selectedLevelsCount(): number {
    return (this.orgUnitLevels || []).filter(
      (orgUnitLevel: OrgUnitLevel) => orgUnitLevel.selected
    ).length;
  }

  get selectedGroupsCount(): number {
    return (this.orgUnitGroups || []).filter(
      (orgUnitGroup: OrgUnitGroup) => orgUnitGroup.selected
    ).length;
  }

  get selectedOrgUnitGroupsList(): string {
    return (
      (
        (this.orgUnitGroups || []).filter(
          (orgUnitGroup, index) => orgUnitGroup.selected
        ) || []
      ).map((ouGroup) => ouGroup?.name) || []
    ).join(';');
  }

  onGroupSetSelect(event: MatSelectChange): void {
    this.currentOrgUnitGroupSet = event?.value;
  }

  constructor() {}

  ngOnInit() {}

  onOrgUnitGroupLevelFilter(e) {
    e.stopPropagation();
    this.orgUnitGroupLevelSearchQuery = e.target.value;
  }

  onUpdate(
    e,
    selectedOrgUnitLevelOrGroup: any,
    itemType: string,
    orgUnitGroupSet?: OrgUnitGroup
  ) {
    e.stopPropagation();
    if (selectedOrgUnitLevelOrGroup.selected) {
      this.deactivateOrgUnitLevelOrGroup.emit({
        id:
          itemType === 'LEVEL'
            ? 'LEVEL-' + selectedOrgUnitLevelOrGroup.level
            : 'OU_GROUP-' + selectedOrgUnitLevelOrGroup.id,
        name: selectedOrgUnitLevelOrGroup.name,
        type:
          itemType === 'LEVEL'
            ? OrgUnitTypes.ORGANISATION_UNIT_LEVEL
            : OrgUnitTypes.ORGANISATION_UNIT_GROUP,
        groupSet:
          itemType !== 'LEVEL'
            ? {
                id: orgUnitGroupSet?.id,
                name: orgUnitGroupSet?.name,
              }
            : null,
      });
    } else {
      this.activateOrgUnitLevelOrGroup.emit({
        id:
          itemType === 'LEVEL'
            ? 'LEVEL-' + selectedOrgUnitLevelOrGroup.level
            : 'OU_GROUP-' + selectedOrgUnitLevelOrGroup.id,
        name: selectedOrgUnitLevelOrGroup.name,
        type:
          itemType === 'LEVEL'
            ? OrgUnitTypes.ORGANISATION_UNIT_LEVEL
            : OrgUnitTypes.ORGANISATION_UNIT_GROUP,
        groupSet:
          itemType !== 'LEVEL'
            ? {
                id: orgUnitGroupSet?.id,
                name: orgUnitGroupSet?.name,
              }
            : null,
      });
    }
  }

  trackByOrgUnitLevel(index: number, orgUnitLevel: OrgUnitLevel) {
    return orgUnitLevel ? orgUnitLevel.id : index;
  }
  trackByOrgUnitGroup(index: number, orgUnitGroup: OrgUnitGroup) {
    return orgUnitGroup ? orgUnitGroup.id : index;
  }
}
