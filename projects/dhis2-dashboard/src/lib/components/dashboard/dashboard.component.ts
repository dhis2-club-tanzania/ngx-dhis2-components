import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { User } from '@iapps/ngx-dhis2-http-client';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
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
  @Input() currentDashboardId: string;
  @Input() useDataStore: boolean;
  dashboards$: Observable<Dashboard[]>;
  currentDashboard$: Observable<any>;
  @Output() currentDashboard: EventEmitter<string> = new EventEmitter<string>();

  selectedTab = new UntypedFormControl(0);
  constructor(private store: Store<DashboardAppState>) {}

  ngOnInit(): void {
    this.dashboards$ = this.store.pipe(select(getAllDashboards));
    this.currentDashboard$ = this.store.pipe(select(getCurrentDashboard()));
    this.currentDashboard.emit(this.currentDashboardId);
    this.store.dispatch(setCurrentDashboard({ id: this.currentDashboardId }));
  }

  onSetCurrentDashboard(dashboardId: string): void {
    // console.log("check?");
    // console.log(dashboardId);
    this.currentDashboardId = dashboardId;
    this.store.dispatch(setCurrentDashboard({ id: dashboardId }));
    this.currentDashboard$ = of(null);
    this.currentDashboard.emit(dashboardId);
    setTimeout(() => {
      this.currentDashboard$ = this.store.pipe(select(getCurrentDashboard()));
    }, 1000);
  }

  onGetCurrentDashboardId(id: string): void {
    this.currentDashboard.emit(id);
  }

  changeTab(val) {
    this.selectedTab.setValue(val);
  }
}
