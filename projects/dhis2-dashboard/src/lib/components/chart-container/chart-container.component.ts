import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Fn } from '@iapps/function-analytics';
import { D2Visualizer } from '@iapps/d2-visualizer';
import * as _ from 'lodash';
import { DashboardService } from '../../services/dashboard.service';

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
    console.log(JSON.stringify(this.chartConfigs));
    this.loadingData = true;
    this.dataLoaded = false;

    this.visualizationAnalytics$ =
      this.dashboardService.fetchDashboardItemAnalyticsData();

    let analyticsData = new Fn.Analytics();

    this.chartConfigs?.columns?.forEach((dimension) => {
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

    this.chartConfigs?.filters?.forEach((dimension) => {
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

    this.chartConfigs?.rows?.forEach((dimension) => {
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
    });
  }

  drawChart(analytics: any) {
    // console.log('the analytics results');
    // console.log(analytics?._data);

    // console.log('dboard item configs');
    // console.log(this.dashbordItemConfigs);

    // console.log('the chart configs');
    // console.log(this.chartConfigs);

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

    console.log('the analytics :: ');
    console.log(analytics);

    console.log('configurations  :: ');
    console.log(config);

    console.log('chart configs :: ');
    console.log(this.chartConfigs);

    const visualizer = new D2Visualizer()
      .setConfig(config)
      .setData(analytics?.data || analytics?._data)
      .setId(this.chartConfigs?.id)
      .setType(this.dashbordItemConfigs?.type)
      .setChartType(this.chartConfigs?.type?.toLowerCase())
      .draw();

    this.dataLoaded = true;
    this.loadingData = false;
  }
}
