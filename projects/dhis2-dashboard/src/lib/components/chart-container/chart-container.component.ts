import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Fn } from '@iapps/function-analytics';
import { D2Visualizer } from '@iapps/d2-visualizer';
import * as _ from 'lodash';
import { DashboardService } from '../../services/dashboard.service';
import { updateVisualizationObject } from '../../helpers/update-visualization-object.helper';
import {
  LINE_ICON,
  COLUMN_CHART_ICON,
  BAR_CHART_ICON,
} from '../../shared/icons';

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.css'],
})
export class ChartContainerComponent implements OnInit {
  @Input() visualizationConfigs: any;
  @Input() dashbordItemConfigs: any;

  @Output() onGraphTypeUpdate: EventEmitter<any> = new EventEmitter<any>();

  analyticsResults: any;
  visualizationAnalytics$: Observable<any>;
  loadingData: boolean = false;
  dataLoaded: boolean = false;
  errorLoadingData = false;
  errorResponse = null;
  showVisualizationOptions: boolean = false;
  currentVisualizationType: string;
  metadataIdentifiers: string[];
  dictionaryConfig: any = {
    showAllBlock: false,
  };
  chartIcon: string;
  barIcon: string;
  lineIcon: string;
  keyForDX: string;
  visualizationSubTitle: string = '';

  tableConfiguration = {
    id: 'rdRirQR8UwC_table',
    title: 'EHS: Colored Table',
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

  // tableConfiguration = {
  //   id: 'rdRirQR8UwC_table',
  //   title: '',
  //   subtitle: '',
  //   showColumnTotal: true,
  //   showColumnSubtotal: true,
  //   showRowTotal: true,
  //   showRowSubtotal: true,
  //   showDimensionLabels: true,
  //   hideEmptyRows: false,
  //   showHierarchy: false,
  //   displayList: false,
  //   rows: ['dx'],
  //   columns: ['pe'],
  //   filters: ['ou'],
  //   legendSet: null,
  //   legendDisplayStrategy: 'FIXED',
  //   styles: null,
  //   isConsecutivePeDiff: true
  // };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.currentVisualizationType = this.dashbordItemConfigs?.type;
    this.getAnalyticsObject();
    this.metadataIdentifiers = [];

    this.chartIcon = COLUMN_CHART_ICON;
    this.lineIcon = LINE_ICON;
    this.barIcon = BAR_CHART_ICON;

   }

  drawChart(analytics: any) {
    let config = {
      renderId: this.visualizationConfigs?.id,
      type: this.dashbordItemConfigs?.type,
      title: this.visualizationConfigs?.name,
      subtitle: this.visualizationSubTitle || '',
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
      .setData(analytics?._data || analytics?.data)
      .setId(this.visualizationConfigs?.id)
      .setType(this.dashbordItemConfigs?.type)
      .setChartType(this.visualizationConfigs?.type?.toLowerCase())
      .draw();
  }

  getAnalyticsObject(selections?: any, chartType?: String): void {
    this.loadingData = true;
    this.dataLoaded = false;
    this.errorLoadingData = false;
    this.errorResponse = null;

    if (chartType != null) {
      this.visualizationConfigs = {
        ...this.visualizationConfigs,
        type: chartType?.toLowerCase(),
      };
    }

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

    this.visualizationSubTitle = '';

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

        this.visualizationSubTitle =
          dimension?.items?.map((item) => item?.name)?.join(',') +
          this.visualizationSubTitle;
      } else if (dimension?.dimension == 'pe') {
        // console.log('the dimension');
        // console.log(dimension);

        analyticsData.setPeriod(
          dimension?.items?.map((item) => item?.id)?.join(';')
        );

        this.visualizationSubTitle =
          this.visualizationSubTitle +
          '' +
          dimension?.items?.map((item) => item?.name)?.join(',');
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

    analyticsData.get().then(
      (analyticsResults) => {
        this.drawChart(analyticsResults);
        this.analyticsResults = analyticsResults;
        this.dataLoaded = true;
        this.loadingData = false;
      },
      (error) => {
        this.errorResponse = error?.response;
        this.loadingData = false;
        this.dataLoaded = false;
        this.errorLoadingData = true;
      }
    );
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

  onChartTypeChange(e, type) {
    // console.log(this.dashbordItemConfigs);

    this.onGraphTypeUpdate.emit({
      itemId: this.dashbordItemConfigs?.id,
      type: type,
    });
  }
}
