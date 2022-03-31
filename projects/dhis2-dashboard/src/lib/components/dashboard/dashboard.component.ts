import { Component, Input, OnInit } from '@angular/core';
import { User } from '@iapps/ngx-dhis2-http-client';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Dashboard } from '../../models/dashboard.model';
import { setCurrentDashboard } from '../../store/actions/dashboard.actions';
import { DashboardAppState } from '../../store/reducers';
import {
  getAllDashboards,
  getCurrentDashboard,
} from '../../store/selectors/dashboard-selectors';

@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @Input() currentUser: User;
  dashboards$: Observable<Dashboard[]>;
  currentDashboard$: Observable<any>;
  constructor(private store: Store<DashboardAppState>) {}

  ngOnInit(): void {
    this.dashboards$ = this.store.pipe(select(getAllDashboards));
    this.currentDashboard$ = this.store.pipe(select(getCurrentDashboard()));
  }

  onSetCurrentDashboard(dashboardId: string): void {
    this.store.dispatch(setCurrentDashboard({ id: dashboardId }));
    this.currentDashboard$ = of(null);
    setTimeout(() => {
      this.currentDashboard$ = this.store.pipe(select(getCurrentDashboard()));
    }, 1000);
  }
}
