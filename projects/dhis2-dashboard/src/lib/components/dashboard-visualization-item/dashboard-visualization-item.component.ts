import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardAppState } from '../../store/reducers';
import { getDashboardItemVisualizationConfigs } from '../../store/selectors/dashboard-selectors';
import { ChartContainerComponent } from '../chart-container/chart-container.component';

@Component({
  selector: 'lib-dashboard-visualization-item',
  templateUrl: './dashboard-visualization-item.component.html',
  styleUrls: ['./dashboard-visualization-item.component.css'],
})
export class DashboardVisualizationItemComponent implements OnInit {
  @Input() dashboardItemConfig: any;
  dashboardItemVisualizationConfig$: Observable<any>;

  @ViewChild(ChartContainerComponent, { static: false })
  visualizationContainer: ChartContainerComponent;

  @Output() selectionDimensions: EventEmitter<any[]> = new EventEmitter<
    any[]
  >();
  constructor(
    private dashboardService: DashboardService,
    private store: Store<DashboardAppState>
  ) {}

  ngOnInit(): void {
    this.dashboardItemVisualizationConfig$ = this.store.select(
      getDashboardItemVisualizationConfigs(this.dashboardItemConfig?.id)
    );
  }

  updateVisualizationObjectParameters(selections: any[]): void {
    this.visualizationContainer.getAnalyticsObject(selections);
  }
}
