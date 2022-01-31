import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService, User } from '@iapps/ngx-dhis2-http-client';
import { from, Observable, of, zip } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { getOrgUnitUrls } from '../helpers/get-org-unit-urls.helper';
import { OrgUnitFilterConfig } from '../models/org-unit-filter-config.model';
import { OrgUnit } from '../models/org-unit.model';
import { DEFAULT_ORG_UNIT_FIELDS } from '../constants/default-org-unit-fields.constants';
import * as _ from 'lodash';
import { getCombinedOrgUnits } from '../helpers/get-combined-org-units.helper';
import { getUserOrgUnits } from '../helpers/get-user-org-units.helper';
import { OrgUnitLevelService } from './org-unit-level.service';
import { OrgUnitLevel } from '../models/org-unit-level.model';
import { sortOrgUnitsByName } from '../helpers/sort-org-units.helper';
import { OrgUnitTypes } from '../constants/org-unit-types.constants';

@Injectable()
export class OrgUnitService {
  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private orgUnitLevelService: OrgUnitLevelService
  ) {}

  loadAll(
    orgUnitFilterConfig: OrgUnitFilterConfig,
    userOrgUnits: string[]
  ): Observable<OrgUnit[]> {
    const pageSize = orgUnitFilterConfig.batchSize || 500;
    const orgUnitFields = _.join(
      _.uniq([
        ...DEFAULT_ORG_UNIT_FIELDS,
        ...(orgUnitFilterConfig.additionalQueryFields || []),
      ]),
      ','
    );
    return this.httpClient
      .get('organisationUnits.json', {
        useIndexDb: true,
        fetchOnlineIfNotExist: false,
      })
      .pipe(
        catchError(() => of({ organisationUnits: [] })),
        switchMap((indexDBResponse: any) => {
          const indexDBOrgUnits = indexDBResponse
            ? indexDBResponse.organisationUnits || []
            : [];

          return indexDBOrgUnits.length > 0
            ? of(indexDBOrgUnits)
            : this._getInitialOrgUnits(
                userOrgUnits,
                pageSize,
                orgUnitFilterConfig.minLevel,
                orgUnitFields
              ).pipe(
                mergeMap((orgUnitResponse: any) => {
                  const orgUnitLength =
                    orgUnitResponse && orgUnitResponse.pager
                      ? orgUnitResponse.pager.total
                      : 0;

                  if (orgUnitLength === 0) {
                    return of([]);
                  }

                  const pageCount = Math.ceil(orgUnitLength / pageSize);
                  return from(
                    getOrgUnitUrls(
                      userOrgUnits,
                      pageCount,
                      pageSize,
                      orgUnitFilterConfig.minLevel,
                      orgUnitFields
                    )
                  ).pipe(
                    mergeMap((orgUnitUrl: string, index: number) => {
                      return index === 0
                        ? of(orgUnitResponse.organisationUnits || [])
                        : this._loadOrgUnitsByUrl(orgUnitUrl);
                    })
                  );
                })
              );
        })
      );
  }

  loadById(
    id: string,
    orgUnitFilterConfig: OrgUnitFilterConfig
  ): Observable<OrgUnit> {
    const orgUnitFields = _.join(
      _.uniq([
        ...DEFAULT_ORG_UNIT_FIELDS,
        ...(orgUnitFilterConfig.additionalQueryFields || []),
      ]),
      ','
    );
    return this.httpClient.get(
      `organisationUnits/${id}.json?fields=${orgUnitFields}`,
      { useIndexDb: true }
    );
  }

  loadByIds(
    ids: string[],
    orgUnitFilterConfig: OrgUnitFilterConfig
  ): Observable<OrgUnit[]> {
    const orgUnitFields = _.join(
      _.uniq([
        ...DEFAULT_ORG_UNIT_FIELDS,
        ...(orgUnitFilterConfig.additionalQueryFields || []),
      ]),
      ','
    );

    return this.httpClient
      .get(
        `organisationUnits.json?fields=${orgUnitFields}&filter=id:in:[${ids.join(
          ','
        )}]&paging=false`,
        { useIndexDb: true }
      )
      .pipe(
        map((res: any) =>
          (res ? res.organisationUnits : []).map((orgUnit: OrgUnit) => ({
            ...orgUnit,
            type: OrgUnitTypes.ORGANISATION_UNIT,
          }))
        )
      );
  }

  loadChildren(
    id: string,
    level: number,
    orgUnitFilterConfig: OrgUnitFilterConfig
  ): Observable<OrgUnit[]> {
    const orgUnitFields = _.join(
      _.uniq([
        ...DEFAULT_ORG_UNIT_FIELDS,
        ...(orgUnitFilterConfig.additionalQueryFields || []),
      ]),
      ','
    );

    return this.orgUnitLevelService.loadAll().pipe(
      mergeMap((orgUnitLevels: OrgUnitLevel[]) => {
        const lowestOrgUnitLevel: OrgUnitLevel = _.maxBy(
          orgUnitLevels,
          'level'
        );

        return lowestOrgUnitLevel && lowestOrgUnitLevel.level > level
          ? this.httpClient
              .get(
                `organisationUnits.json?fields=${orgUnitFields}&filter=parent.id:eq:${id}&paging=false`,
                { useIndexDb: true }
              )
              .pipe(
                map((res) =>
                  res ? sortOrgUnitsByName(res.organisationUnits) : []
                )
              )
          : of([]);
      })
    );
  }

  loadUserOrgUnits(
    orgUnitFilterConfig: OrgUnitFilterConfig
  ): Observable<OrgUnit[]> {
    return this.httpClient.me().pipe(
      switchMap((user: User) => {
        const userOrgUnits: OrgUnit[] = getUserOrgUnits(
          user,
          orgUnitFilterConfig.reportUse,
          false
        ) as OrgUnit[];
        return zip(
          ...userOrgUnits.map((orgUnit: OrgUnit) =>
            this.loadChildren(
              orgUnit.id,
              orgUnit.level,
              orgUnitFilterConfig
            ).pipe(map((children: OrgUnit[]) => ({ ...orgUnit, children })))
          )
        );
      })
    );
  }

  private _getInitialOrgUnits(
    userOrgUnits: string[],
    pageSize: number,
    minLevel: number,
    orgUnitFields
  ) {
    return zip(
      ...userOrgUnits.map((orgUnitId: string) =>
        this.httpClient.get(
          'organisationUnits.json?fields=' +
            orgUnitFields +
            'filter=path:ilike:' +
            orgUnitId +
            '&pageSize=' +
            pageSize +
            (minLevel ? '&filter=level:le:' + minLevel : ''),
          { useIndexDb: true }
        )
      )
    ).pipe(map((orgUnitResults: any[]) => getCombinedOrgUnits(orgUnitResults))).pipe(
      map((orgUnitResult: any) => {
        return {
          pager : orgUnitResult.pager || {},
          organisationUnits : _.sortBy(orgUnitResult.organisationUnits, ['level','name'])
        };
      })
    );
  }

  private _loadOrgUnitsByUrl(orgUnitUrl: string) {
    return this.httpClient
      .get(orgUnitUrl, {
        useIndexDb: true,
      })
      .pipe(
        map((orgUnitResult: any) => {
          return _.sortBy(orgUnitResult.organisationUnits, ['level','name']);
        })
      );
  }
}
