import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadVisualizationsConfigurations } from '../../store/actions/dashboard.actions';
import { DashboardAppState } from '../../store/reducers';

@Component({
  selector: 'lib-current-dashboard',
  templateUrl: './current-dashboard.component.html',
  styleUrls: ['./current-dashboard.component.css'],
})
export class CurrentDashboardComponent implements OnInit {
  @Input() currentDashboard: any;
  @Output() currentDashboardId: EventEmitter<string> =
    new EventEmitter<string>();
  constructor(private store: Store<DashboardAppState>) {}

  ngOnInit(): void {
    this.currentDashboardId.emit(this.currentDashboard?.id);
    this.store.dispatch(
      loadVisualizationsConfigurations({
        visualizationsDetails: this.currentDashboard?.dashboardItems.map(
          (dashboardItem) => {
            return {
              dashboardId: dashboardItem?.dashboardId,
              dashboardItemId: dashboardItem?.id,
              visId: dashboardItem?.visualization?.id,
            };
          }
        ),
      })
    );
  }
}
