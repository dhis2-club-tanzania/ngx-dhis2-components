import { Component, Input, OnInit } from '@angular/core';
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
  @Input() chartConfigs: any;
  @Input() dashbordItemConfigs: any;
  visualizationAnalytics$: Observable<any>;
  loadingData: boolean = false;
  dataLoaded: boolean = false;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getAnalyticsObject();
  }

  drawChart(analytics: any) {
    let config = {
      renderId: this.chartConfigs?.id,
      type: this.dashbordItemConfigs?.type,
      title: this.chartConfigs?.name,
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
        this.chartConfigs.rows.map((row) => row.dimension) || []
      ),
      yAxisType:
        this.chartConfigs?.columns?.length > 0
          ? this.chartConfigs?.columns[0]?.dimension
          : null,
      zAxisType: _.uniq(
        this.chartConfigs?.filters.map((row) => row.dimension) || []
      ),
      touched: true,
    };

    const visualizer = new D2Visualizer()
      .setConfig(config)
      .setData(analytics?.data || analytics?._data)
      .setId(this.chartConfigs?.id)
      .setType(this.dashbordItemConfigs?.type)
      .setChartType(this.chartConfigs?.type?.toLowerCase())
      .draw();
  }

  getAnalyticsObject(selections?: any): void {
    this.loadingData = true;
    this.dataLoaded = false;

    const visualizationObject = selections
      ? updateVisualizationObject(this.chartConfigs, selections)
      : this.chartConfigs;

    this.visualizationAnalytics$ =
      this.dashboardService.fetchDashboardItemAnalyticsData();

    let analyticsData = new Fn.Analytics();

    visualizationObject?.columns?.forEach((dimension) => {
      if (dimension?.dimension == 'dx') {
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

      this.dataLoaded = true;
      this.loadingData = false;
    });
  }

  updateChartConfigs(): void {}
}
