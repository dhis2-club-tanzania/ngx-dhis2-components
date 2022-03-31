import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'lib-dashboard-visualization-item',
  templateUrl: './dashboard-visualization-item.component.html',
  styleUrls: ['./dashboard-visualization-item.component.css'],
})
export class DashboardVisualizationItemComponent implements OnInit {
  @Input() dashboardItemConfig: any;
  dashboardItemChartConfig$: Observable<any>;
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardItemChartConfig$ =
      this.dashboardService.getVisualizationsConfigs(this.dashboardItemConfig);
  }
}
