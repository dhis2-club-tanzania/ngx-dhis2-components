import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '@iapps/ngx-dhis2-http-client';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadDashboards } from '../../store/actions/dashboard.actions';
import { DashboardAppState } from '../../store/reducers';
import { getCurrentUser } from '../../store/selectors/user.selectors';

@Component({
  selector: 'lib-dhis2-dashboard',
  templateUrl: './dhis2-dashboard.component.html',
  styleUrls: ['./dhis2-dashboard.component.css'],
})
export class Dhis2DashboardComponent implements OnInit {
  currentUser$: Observable<User>;
  @Input() currentDashboardId: string;
  @Input() useDataStore: boolean;
  @Input() dataStoreKeyRef: string;
  @Output() currentDashboard: EventEmitter<string> = new EventEmitter<string>();
  constructor(private store: Store<DashboardAppState>) {}

  ngOnInit(): void {
    this.currentUser$ = this.store.select(getCurrentUser);
    this.store.dispatch(
      loadDashboards({
        useDataStore: true,
        dataStoreKeyRef: 'ehs-surveillance',
      })
    );
  }

  onGetCurrentDashboard(id: string): void {
    this.currentDashboard.emit(id);
  }
}
