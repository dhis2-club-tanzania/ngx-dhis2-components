import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { updateVisualizationObject } from '../../helpers/update-visualization-object.helper';
import { DashboardService } from '../../services/dashboard.service';
import { ChartContainerComponent } from '../chart-container/chart-container.component';

@Component({
  selector: 'lib-dashboard-visualization-item',
  templateUrl: './dashboard-visualization-item.component.html',
  styleUrls: ['./dashboard-visualization-item.component.css'],
})
export class DashboardVisualizationItemComponent implements OnInit {
  @Input() dashboardItemConfig: any;
  @Input() selections: any[];
  dashboardItemChartConfig$: Observable<any>;

  @ViewChild(ChartContainerComponent, { static: false })
  visualizationContainer: ChartContainerComponent;
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardItemChartConfig$ =
      this.dashboardService.getVisualizationsConfigs(this.dashboardItemConfig);
  }

  updateVisualizationObjectParameters(selections: any[]): void {
    this.visualizationContainer.getAnalyticsObject(selections);
  }
}
