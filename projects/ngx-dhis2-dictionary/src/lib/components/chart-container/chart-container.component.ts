import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Fn } from '@iapps/function-analytics';
import { D2Visualizer } from '@iapps/d2-visualizer';
import * as _ from 'lodash';
import { updateVisualizationObject } from '../../helpers/visualization.helper';

@Component({
  selector: 'lib-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.css'],
})
export class ChartContainerComponent implements OnInit {
  @Input() visualizationConfigs: any;
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

  constructor() {}

  ngOnInit(): void {
    this.currentVisualizationType = this.visualizationConfigs?.type;
    this.getAnalyticsObject();
    this.metadataIdentifiers = [];
  }

  drawChart(analytics: any) {
    let config = {
      renderId: this.visualizationConfigs?.id,
      type: this.visualizationConfigs?.type,
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
      .setType(this.visualizationConfigs?.type)
      .setChartType(this.visualizationConfigs?.type?.toLowerCase())
      .draw();
  }

  getAnalyticsObject(selections?: any): void {
    this.loadingData = true;
    this.dataLoaded = false;

    console.log(selections);
    const visualizationObject = selections
      ? updateVisualizationObject(this.visualizationConfigs, selections)
      : this.visualizationConfigs;
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
      this.dataLoaded = true;
      this.loadingData = false;
      setTimeout(() => {
        this.drawChart(analyticsResults);
        this.analyticsResults = analyticsResults;
      }, 200);
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
