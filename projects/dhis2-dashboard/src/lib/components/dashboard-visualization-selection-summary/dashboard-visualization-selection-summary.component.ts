import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DashboardAppState } from '../../store/reducers';
import { getCurrentDashboardVisualizationSelections } from '../../store/selectors/dashboard-selectors';

@Component({
  selector: 'lib-dashboard-visualization-selection-summary',
  templateUrl: './dashboard-visualization-selection-summary.component.html',
  styleUrls: ['./dashboard-visualization-selection-summary.component.css'],
})
export class DashboardVisualizationSelectionSummaryComponent implements OnInit {
  @Input() dashboardItem: any;
  selections$: Observable<any[]>;
  constructor(private store: Store<DashboardAppState>) {}

  ngOnInit(): void {
    this.selections$ = this.store.select(
      getCurrentDashboardVisualizationSelections(this.dashboardItem?.id)
    );
  }
}
