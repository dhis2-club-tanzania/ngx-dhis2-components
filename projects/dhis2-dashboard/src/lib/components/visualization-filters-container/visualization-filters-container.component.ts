import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DashboardAppState } from '../../store/reducers';
import { getCurrentDashboardVisualizationSelections } from '../../store/selectors/dashboard-selectors';

@Component({
  selector: 'lib-visualization-filters-container',
  templateUrl: './visualization-filters-container.component.html',
  styleUrls: ['./visualization-filters-container.component.css'],
})
export class VisualizationFiltersContainerComponent implements OnInit {
  @Input() filterType: string;
  @Input() dashboardItem: any;
  @Output() selections: EventEmitter<any[]> = new EventEmitter<any[]>();
  selections$: Observable<any[]>;
  constructor(private store: Store<DashboardAppState>) {}

  ngOnInit(): void {
    this.selections$ = this.store
      .select(
        getCurrentDashboardVisualizationSelections(this.dashboardItem?.id)
      )
      .pipe(take(1));
  }

  onGetSelections(selections: any[]): void {
    this.selections.emit(selections);
  }
}
