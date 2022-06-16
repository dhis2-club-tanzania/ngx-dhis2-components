import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Fn } from '@iapps/function-analytics';
import { D2Visualizer } from '@iapps/d2-visualizer';
import * as _ from 'lodash';
import { DashboardService } from '../../services/dashboard.service';
import { updateVisualizationObject } from '../../helpers/update-visualization-object.helper';

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.css'],
})
export class ChartContainerComponent implements OnInit {
  @Input() visualizationConfigs: any;
  @Input() dashbordItemConfigs: any;
  analyticsResults: any;
  visualizationAnalytics$: Observable<any>;
  loadingData: boolean = false;
  dataLoaded: boolean = false;
  showVisualizationOptions: boolean = false;
  currentVisualizationType: string;
  metadataIdentifiers: string[];
  dictionaryConfig: any = {
    showAllBlock: false,
  };
  keyForDX: string;

  tableConfiguration = {
    id: 'rdRirQR8UwC_table',
    title: '',
    subtitle: '',
    showColumnTotal: true,
    showColumnSubtotal: true,
    showRowTotal: true,
    showRowSubtotal: true,
    showDimensionLabels: true,
    hideEmptyRows: false,
    showHierarchy: false,
    displayList: false,
    rows: ['dx'],
    columns: ['pe'],
    filters: ['ou'],
    legendSet: null,
    legendDisplayStrategy: 'FIXED',
    styles: null,
    isConsecutivePeDiff: true
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.currentVisualizationType = this.dashbordItemConfigs?.type;
    this.getAnalyticsObject();
    this.metadataIdentifiers = [];
  }

  drawChart(analytics: any) {
    let config = {
      renderId: this.visualizationConfigs?.id,
      type: this.dashbordItemConfigs?.type,
      title: this.visualizationConfigs?.name,
      subtitle: '',
      hideTitle: false,
      hideSubtitle: false,
      showData: true,
      hideEmptyRows: true,
      hideLegend: false,
      cumulativeValues: false,
      targetLineLabel: '',
      baseLineLabel: '',
      legendAlign: 'bottom',
      reverseLegend: false,
      showLabels: true,
      axes: [],
      sortOrder: 0,
      percentStackedValues: false,
      multiAxisTypes: [],
      xAxisType: _.uniq(
        this.visualizationConfigs.rows.map((row) => row.dimension) || []
      ),
      yAxisType:
        this.visualizationConfigs?.columns?.length > 0
          ? this.visualizationConfigs?.columns[0]?.dimension
          : null,
      zAxisType: _.uniq(
        this.visualizationConfigs?.filters.map((row) => row.dimension) || []
      ),
      touched: true,
    };

    const visualizer = new D2Visualizer()
      .setConfig(config)
      .setData(analytics?.data || analytics?._data)
      .setId(this.visualizationConfigs?.id)
      .setType(this.dashbordItemConfigs?.type)
      .setChartType(this.visualizationConfigs?.type?.toLowerCase())
      .draw();
  }

  getAnalyticsObject(selections?: any): void {
    this.loadingData = true;
    this.dataLoaded = false;

    const visualizationObject = selections
      ? updateVisualizationObject(this.visualizationConfigs, selections)
      : this.visualizationConfigs;

    this.visualizationAnalytics$ =
      this.dashboardService.fetchDashboardItemAnalyticsData();

    let analyticsData = new Fn.Analytics();

    visualizationObject?.columns?.forEach((dimension) => {
      if (dimension?.dimension == 'dx') {
        this.keyForDX = 'columns';
        analyticsData.setData(
          dimension?.items?.map((item) => item?.id)?.join(';')
        );
      } else if (dimension?.dimension == 'ou') {
        analyticsData.setOrgUnit(
          dimension?.items?.map((item) => item?.id)?.join(';')
        );
      } else if (dimension?.dimension == 'pe') {
        analyticsData.setPeriod(
          dimension?.items?.map((item) => item?.id)?.join(';')
        );
      } else {
      }
    });

    visualizationObject?.filters?.forEach((dimension) => {
      if (dimension?.dimension == 'dx') {
        this.keyForDX = 'filters';
        analyticsData.setData(
          dimension?.items?.map((item) => item?.id)?.join(';')
        );
      } else if (dimension?.dimension == 'ou') {
        analyticsData.setOrgUnit(
          dimension?.items?.map((item) => item?.id)?.join(';')
        );
      } else if (dimension?.dimension == 'pe') {
        analyticsData.setPeriod(
          dimension?.items?.map((item) => item?.id)?.join(';')
        );
      } else {
      }
    });

    visualizationObject?.rows?.forEach((dimension) => {
      if (dimension?.dimension == 'dx') {
        this.keyForDX = 'rows';
        analyticsData.setData(
          dimension?.items?.map((item) => item?.id)?.join(';')
        );
      } else if (dimension?.dimension == 'ou') {
        analyticsData.setOrgUnit(
          dimension?.items?.map((item) => item?.id)?.join(';')
        );
      } else if (dimension?.dimension == 'pe') {
        analyticsData.setPeriod(
          dimension?.items?.map((item) => item?.id)?.join(';')
        );
      } else {
      }
    });

    analyticsData.get().then((analyticsResults) => {
      this.drawChart(analyticsResults);
      this.analyticsResults = analyticsResults;
      this.dataLoaded = true;
      this.loadingData = false;
    });
  }

  updatevisualizationConfigs(): void {}

  onVisualizationTypeChange(type: string): void {
    this.currentVisualizationType = type;
    if (this.currentVisualizationType === 'CHART') {
      this.drawChart(this.analyticsResults);
    } else if (this.currentVisualizationType === 'INFO') {
      this.metadataIdentifiers =
        this.visualizationConfigs[this.keyForDX][0]?.items?.map(
          (item) => item?.id
        ) || [];
    }
    // this.store.dispatch(
    //   updateCurrentVisualizationType({
    //     visualizationType: type,
    //     dashboardId: this.dashboardItemConfig?.dashboardId,
    //     dashboardItemId: this.dashboardItemConfig?.id,
    //   })
    // );
  }
}
