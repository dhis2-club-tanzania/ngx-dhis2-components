import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartContainerComponent } from '../chart-container/chart-container.component';
import { VisualizationFiltersContainerComponent } from '../visualization-filters-container/visualization-filters-container.component';

@Component({
  selector: 'lib-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.css'],
})
export class DataAnalysisComponent implements OnInit {
  @Input() indicator: any;
  currentFilterType: string = 'PERIOD';
  visualizationConfigs: any;
  selections: any[];
  showFilterSelections: boolean = false;

  @ViewChild(ChartContainerComponent, { static: false })
  visualizationContainer: ChartContainerComponent;

  @ViewChild(VisualizationFiltersContainerComponent, { static: false })
  visualizationFiltersContainerComponent: VisualizationFiltersContainerComponent;
  constructor() {}

  ngOnInit(): void {
    this.visualizationConfigs = {
      type: 'line',
      title: 'Line chart for ' + this.indicator?.name,
      id: this.indicator?.id,
      visualization: {
        name: this.indicator?.name,
      },
      columns: [
        {
          dimensionType: 'ORGANISATION_UNIT',
          dimension: 'ou',
          items: [
            {
              code: 'USER_ORGUNIT',
              id: 'USER_ORGUNIT',
              name: 'USER_ORGUNIT',
              displayName: 'USER_ORGUNIT',
              externalAccess: false,
              periodOffset: 0,
              dimensionItem: 'USER_ORGUNIT',
              sharing: {
                external: false,
                users: {},
                userGroups: {},
              },
              displayFormName: 'USER_ORGUNIT',
            },
          ],
        },
      ],
      filters: [
        {
          dimensionType: 'DATA_X',
          dimension: 'dx',
          items: [
            {
              id: this.indicator?.id,
              name: this.indicator?.name,
              shortName: this.indicator?.shortName,
            },
          ],
        },
      ],
      rows: [
        {
          dimensionType: 'PERIOD',
          dimension: 'pe',
          items: [
            {
              code: 'LAST_12_MONTHS',
              id: 'LAST_12_MONTHS',
              name: 'LAST_12_MONTHS',
              shortName: 'LAST_12_MONTHS',
              displayName: 'LAST_12_MONTHS',
              displayShortName: 'LAST_12_MONTHS',
              externalAccess: false,
              periodOffset: 0,
              dimensionItem: 'LAST_12_MONTHS',
              sharing: {
                external: false,
                users: {},
                userGroups: {},
              },
              displayFormName: 'LAST_12_MONTHS',
              favorite: false,
              dimensionItemType: 'PERIOD',
              access: {
                read: true,
                update: true,
                externalize: true,
                delete: true,
                write: true,
                manage: true,
              },
              favorites: [],
              translations: [],
              userGroupAccesses: [],
              attributeValues: [],
              userAccesses: [],
              legendSets: [],
            },
          ],
        },
      ],
      periods: {
        dimensionType: 'PERIOD',
        dimension: 'pe',
        items: [
          {
            code: 'LAST_12_MONTHS',
            id: 'LAST_12_MONTHS',
            name: 'LAST_12_MONTHS',
            shortName: 'LAST_12_MONTHS',
            displayName: 'LAST_12_MONTHS',
            displayShortName: 'LAST_12_MONTHS',
            externalAccess: false,
            periodOffset: 0,
            dimensionItem: 'LAST_12_MONTHS',
            displayFormName: 'LAST_12_MONTHS',
            favorite: false,
            dimensionItemType: 'PERIOD',
          },
        ],
      },
      rowDimensions: ['pe'],
      columnDimensions: ['ou'],
      filterDimensions: ['dx'],
    };

    this.selections = [
      this.visualizationConfigs?.columns[0],
      this.visualizationConfigs?.rows[0],
    ];
  }

  toggleFilters(event: Event): void {
    event.stopPropagation();
    this.showFilterSelections = !this.showFilterSelections;
  }

  toggleFilterType(event: Event, filterType): void {
    event.stopPropagation();
    this.showFilterSelections = true;
    this.currentFilterType = filterType;
  }

  onCancel(event: Event): void {
    event.stopPropagation();
    this.showFilterSelections = false;
  }

  onUpdate(event: Event, selections: any[]): void {
    event.stopPropagation();

    this.visualizationContainer.getAnalyticsObject(selections);
    this.showFilterSelections = false;
  }

  onGetSelections(selections: any[]): void {
    this.selections = selections;
    console.log('HEHEHEH');
    if (this.selections) {
      this.visualizationFiltersContainerComponent.onSetSelections(
        this.selections
      );
    }
  }
}
