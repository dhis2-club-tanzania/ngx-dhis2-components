import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { DashboardPreferences } from '../../models/dashboard-preferences.model';
import { Dashboard } from '../../models/dashboard.model';
import { DashboardModeState } from '../../models/dashboard-mode.mode';
import { DashboardActionUpdate } from '../../models/dashboard-action-update.model';
import { DashboardAction } from '../../models/dashboard-action.model';
import { DASHBOARD_ACTIONS } from '../../constants/dashboard-actions.constant';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMenuComponent implements OnInit {
  @Input() dashboardPreferences: DashboardPreferences;
  @Input() dashboards: Dashboard[];
  @Input() currentDashboard: Dashboard;
  @Input() dashboardMode: DashboardModeState;
  @Input() userIsAdmin: boolean;

  dashboardActions: DashboardAction[];

  @Output() setCurrentDashboard: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() addDashboard: EventEmitter<any> = new EventEmitter<any>();
  @Output() actionUpdate: EventEmitter<DashboardActionUpdate> =
    new EventEmitter<DashboardActionUpdate>();
  @Output() showHelp: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit() {
    this.dashboardActions = DASHBOARD_ACTIONS;
  }

  onSetCurrentDashboard(id: string) {
    this.setCurrentDashboard.emit(id);
  }

  onAddDashboard() {
    this.addDashboard.emit();
  }

  onActionUpdate(e, type: string) {
    e.stopPropagation();
    this.actionUpdate.emit({ type, dashboard: this.currentDashboard });
  }

  onShowHelpSection(showHelp) {
    this.showHelp.emit(showHelp);
  }
}
