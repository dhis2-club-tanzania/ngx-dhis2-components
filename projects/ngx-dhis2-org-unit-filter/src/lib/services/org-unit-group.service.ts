import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OrgUnitGroupService {
  groupSets: any[] = []; // To catch values (Index DB not being used)
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  loadAll() {
    return this.httpClient
      .get(`organisationUnitGroups.json?fields=id,name&paging=false`, {
        useIndexDb: true,
      })
      .pipe(map((res: any) => res.organisationUnitGroups || []));
  }

  loadAllGroupSets() {
    return this.groupSets?.length === 0
      ? this.httpClient
          .get(
            `organisationUnitGroupSets.json?fields=id,name,organisationUnitGroups[id,name]&paging=false`,
            {
              useIndexDb: false,
            }
          )
          .pipe(
            map((res: any) => {
              this.groupSets = res.organisationUnitGroupSets || [];
              return this.groupSets;
            })
          )
      : of(this.groupSets);
  }
}
