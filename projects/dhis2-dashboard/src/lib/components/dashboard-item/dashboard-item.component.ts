import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';

import {
  DashboardItem,
  DashboardVisualizationDimension,
} from '../../models/dashboard-item.model';
import {
  Visualization,
  VisualizationDataSelection,
} from '../../modules/hris-visualization/models';
import { SystemInfo, User } from 'projects/hris-http-client/src/public-api';
import { VisualizationComponent } from '../../modules/hris-visualization/containers/visualization/visualization.component';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardItemComponent implements OnInit {
  @Input() dashboardItem: DashboardItem;
  @Input() currentUser: User;
  @Input() systemInfo: SystemInfo;
  @Input() isNew: boolean;
  @Input() globalDataSelections: VisualizationDataSelection[];
  @Input() fullScreen: boolean;
  @Input() dashboardItemType: string;
  @Input() fromDashboard: boolean;

  @ViewChild(VisualizationComponent, { static: false })
  visualizationComponent: VisualizationComponent;

  constructor() {}

  ngOnInit() {}

  onGlobalFilterUpdate(globalDataSelections: VisualizationDataSelection[]) {
    if (this.visualizationComponent) {
      this.visualizationComponent.setVisualization(globalDataSelections);
    }
  }

  onUpdateChartType(chartType) {
    this.visualizationComponent.onUpdateChartType(chartType);
  }
}
