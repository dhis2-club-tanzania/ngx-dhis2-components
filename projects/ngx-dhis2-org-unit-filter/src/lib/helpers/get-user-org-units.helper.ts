import * as _ from 'lodash';
import { User } from '@iapps/ngx-dhis2-http-client';
import { OrgUnit } from '../models/org-unit.model';
export function getUserOrgUnits(
  userInfo: User,
  isForReport: boolean,
  onlyId = true
): string[] | OrgUnit[] {
  return _.uniq(
    _.map(
      isForReport && userInfo && userInfo.dataViewOrganisationUnits && userInfo.dataViewOrganisationUnits.length > 0
        ? userInfo.dataViewOrganisationUnits || []
        : userInfo.organisationUnits || [],
      (orgUnit) => (onlyId ? orgUnit.id : orgUnit)
    )
  );
}
