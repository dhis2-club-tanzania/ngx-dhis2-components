import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable, of, pipe } from 'rxjs';
import { IndicatorsService } from '../../services/indicators.service';
import * as indicators from '../../store/actions/indicators.actions';
import { AppState } from '../../store/reducers/indicators.reducers';
import {
  getAllIndicators,
  getIndicatorGroups,
  getListOfIndicators,
} from '../../store/selectors/indicators.selectors';
import { IndicatorGroupsState } from '../../store/state/indicators.state';

@Component({
  selector: 'app-indicators-list',
  templateUrl: './indicators-list.component.html',
  styleUrls: ['./indicators-list.component.css'],
})
export class IndicatorsListComponent implements OnInit {
  @Input() metadataIdentifiers: any;
  @Output() selectedMetadataIdentifier = new EventEmitter<string>();
  @Output() loadedMetadata = new EventEmitter<any>();
  @Output() selectedMetadataGroups = new EventEmitter<any>();
  error = false;
  loading = true;
  hoverState = 'notHovered';
  itemsPerPage = 10;
  selectedIndicator: any = null;
  searchText: string;
  currentPage = 1;
  searchingTextForIndicatorGroup: string;
  indicatorGroupsForSearching = [];
  showIndicatorGroups = false;
  groupToFilter: any[] = [];
  listingIsSet: boolean;
  indicatorGroups$: Observable<IndicatorGroupsState>;
  activeItem: number;
  searchingText: string;
  indicatorsList$: Observable<any>;
  allIndicators$: Observable<any>;
  indicators: any[] = [];
  completedPercent = 0;
  totalAvailableIndicators = 0;
  indicatorGroups: any[] = [];
  activeMetadataType = 'indicator';
  dataToDownload: any = [];
  pageItemsConfiguration = [
    { value: 10, symbol: '10' },
    { value: 25, symbol: '25' },
    { value: 50, symbol: '50' },
    { value: 100, symbol: '100' },
    { value: 200, symbol: '200' },
    { value: 'all', symbol: 'all' },
  ];
  constructor(
    private indicatorsStore: Store<AppState>,
    private indicatorService: IndicatorsService
  ) {
    this.searchText = '';
    this.searchingTextForIndicatorGroup = '';
    this.listingIsSet = true;
    if (this.completedPercent >= 100) {
      this.loading = false;
      this.error = false;
    }
  }

  ngOnInit() {
    this.loadAllIndicators(1, 10);
  }

  setItemsPerPage(value: number): void {
    this.itemsPerPage = value;
    this.allIndicators$ = of(null);
    this.loadAllIndicators(1, this.itemsPerPage);
  }

  searchIndicator(event: any): void {
    this.searchingText = event?.target?.value;
    console.log(this.searchingText);
    this.loadAllIndicators(1, this.itemsPerPage, this.searchingText);
  }

  toggleListingOfItems() {
    this.listingIsSet = !this.listingIsSet;
  }

  selectedMetadata(e) {
    this.selectedMetadataIdentifier.emit(e);
  }

  mouseEnter(indicator, hoverState) {
    this.selectedIndicator = indicator.id;
    this.hoverState = hoverState;
  }

  mouseLeave() {
    this.selectedIndicator = null;
    this.hoverState = 'notHovered';
  }

  showGroups() {
    this.showIndicatorGroups = !this.showIndicatorGroups;
  }

  inGroupToFilter(id) {
    return _.find(this.groupToFilter, { id });
  }

  groupNames() {
    if (this.indicatorGroupsForSearching.length < 5) {
      return this.indicatorGroupsForSearching.map((g) => g.name).join(', ');
    } else {
      const diff = this.indicatorGroupsForSearching.length - 4;
      return (
        this.indicatorGroupsForSearching
          .slice(0, 4)
          .map((g) => g.name)
          .join(', ') +
        ' and ' +
        diff +
        ' More'
      );
    }
  }

  updateIndicatorGroupsForSearch(group, event) {
    if (event) {
      this.indicatorGroupsForSearching.push(group);
    } else {
      const index = this.indicatorGroupsForSearching.indexOf(group);
      this.indicatorGroupsForSearching.splice(index, 1);
    }
    this.indicatorGroups = this.indicatorGroupsForSearching;
    this.selectedMetadataGroups.emit(this.indicatorGroups);
  }

  loadAllIndicators(
    pageNumber: number,
    itemPerPage: number,
    searchingText?: string
  ): void {
    this.allIndicators$ = this.indicatorService.loadIndicatorsByPage(
      pageNumber,
      itemPerPage,
      searchingText
    );
  }

  getNewList(action: string, currentPage: number, itemsPerPage: number): void {
    if (action === 'next') {
      this.allIndicators$ = of(null);
      this.loadAllIndicators(currentPage + 1, itemsPerPage, this.searchingText);
    } else {
      this.allIndicators$ = of(null);
      this.loadAllIndicators(currentPage - 1, itemsPerPage, this.searchingText);
    }
  }

  getActiveMetadataType(type) {
    this.activeMetadataType = type;
  }

  combineIndicatorGroups(groups) {
    let groupsString = '';
    _.map(groups, (group) => {
      groupsString += group.name + ' ,';
    });
    return groupsString;
  }

  filterIndicatorGroups(indicatorGroups, searchingTextForGroups) {
    const splittedName = searchingTextForGroups
      ? searchingTextForGroups.split(/[\.\-_,; ]/)
      : [];
    return splittedName.length > 0
      ? indicatorGroups.filter((item: any) =>
          splittedName.some(
            (nameString: string) =>
              item.name.toLowerCase().indexOf(nameString.toLowerCase()) !== -1
          )
        )
      : indicatorGroups;
  }

  dwndToCSV(metadataObject$, indicatorGroups$?) {
    metadataObject$.subscribe((metadataArr) => {
      const arr = [];
      arr.push('Group ID');
      arr.push('Indicator group');
      arr.push('UID');
      arr.push('Indicator Name');
      arr.push('Description');
      arr.push('Numerator formula');
      arr.push('Numerator description');
      arr.push('Denominator formula');
      arr.push('Numerator description');
      arr.push('Created on');
      arr.push('Created by');
      this.dataToDownload.push(arr);
      let newIndicatorGroups = [];
      indicatorGroups$.subscribe((indicatorGroups) => {
        newIndicatorGroups =
          this.indicatorGroupsForSearching.length > 0
            ? this.indicatorGroupsForSearching
            : indicatorGroups.indicatorGroups;
        _.map(newIndicatorGroups, (indicatorGroup) => {
          _.map(metadataArr, (metadata) => {
            if (
              _.filter(metadata.indicatorGroups, { id: indicatorGroup.id })
                .length > 0
            ) {
              const indicatorsByGroups = [];
              indicatorsByGroups.push(indicatorGroup.id);
              indicatorsByGroups.push(indicatorGroup.name);
              indicatorsByGroups.push(metadata.id);
              indicatorsByGroups.push(metadata.name);
              if (metadata.description) {
                indicatorsByGroups.push(metadata.description);
              } else {
                indicatorsByGroups.push(
                  'Measured by ' +
                    metadata.numeratorDescription +
                    ' to ' +
                    metadata.denominatorDescription
                );
              }
              indicatorsByGroups.push(metadata.numeratorExpression);
              indicatorsByGroups.push(metadata.numeratorDescription);
              indicatorsByGroups.push(metadata.denominatorExpression);
              indicatorsByGroups.push(metadata.denominatorDescription);
              indicatorsByGroups.push(metadata.created);
              indicatorsByGroups.push(metadata.user.name);
              indicatorsByGroups.push(indicatorGroup.name);
              this.dataToDownload.push(indicatorsByGroups);
            }
          });
          this.dataToDownload.push([
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
          ]);
        });
      });
      (function () {
        let asUtf16;
        let downloadExcelCsv;
        let makeExcelCsvBlob;
        let toTsv;
        let rows = this.dataToDownload;

        asUtf16 = (str) => {
          let buffer;
          let bufferView;
          let i;
          let val;
          let _i;
          let _ref;
          buffer = new ArrayBuffer(str.length * 2);
          bufferView = new Uint16Array(buffer);
          bufferView[0] = 0xfeff;
          for (
            i = _i = 0, _ref = str.length;
            0 <= _ref ? _i <= _ref : _i >= _ref;
            i = 0 <= _ref ? ++_i : --_i
          ) {
            val = str.charCodeAt(i);
            bufferView[i + 1] = val;
          }
          return bufferView;
        };

        makeExcelCsvBlob = (rowsRes) => {
          return new Blob([asUtf16(toTsv(rowsRes)).buffer], {
            type: 'text/csv;charset=UTF-16',
          });
        };

        toTsv = (rowsRes) => {
          let escapeValue;
          escapeValue = (val) => {
            if (typeof val === 'string') {
              return '"' + val.replace(/"/g, '""') + '"';
            } else if (val != null) {
              return val;
            } else {
              return '';
            }
          };
          return (
            rowsRes
              .map((row) => {
                return row.map(escapeValue).join(',');
              })
              .join('\n') + '\n'
          );
        };

        downloadExcelCsv = (rowsRes, attachmentFilename) => {
          let a;
          let blob;
          blob = makeExcelCsvBlob(rowsRes);
          a = document.createElement('a');
          a.style.display = 'none';
          a.download = attachmentFilename;
          document.body.appendChild(a);
          a.href = URL.createObjectURL(blob);
          a.click();
          URL.revokeObjectURL(a.href);
          a.remove();
        };
        rows = this.dataToDownload;
        let theDate = new Date();
        theDate = this.datePipe.transform(theDate, 'yyyy-MM-dd');
        return downloadExcelCsv(
          this.dataToDownload,
          'List_of_indicators_generated_on' + theDate + '.csv'
        );
      }.call(this));
    });
  }
}
