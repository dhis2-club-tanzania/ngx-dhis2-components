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
  @Input() selections: any[];
  dashboardItemChartConfig$: Observable<any>;
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardItemConfigs(this.selections);
  }

  loadDashboardItemConfigs(selections: any[]): void {
    // TODO: Renaming should be done
    this.dashboardItemChartConfig$ =
      this.dashboardService.getVisualizationsConfigs(
        this.dashboardItemConfig,
        selections
      );
  }
}
