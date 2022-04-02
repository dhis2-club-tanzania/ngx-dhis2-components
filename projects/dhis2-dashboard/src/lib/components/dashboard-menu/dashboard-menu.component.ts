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

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMenuComponent implements OnInit {
  @Input() dashboardPreferences: DashboardPreferences;
  @Input() dashboards: Dashboard[];
  @Input() currentDashboardId: string;
  currentDashboard: Dashboard;
  @Input() dashboardMode: DashboardModeState;
  @Input() userIsAdmin: boolean;

  @Output() setCurrentDashboard: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() addDashboard: EventEmitter<any> = new EventEmitter<any>();
  @Output() actionUpdate: EventEmitter<DashboardActionUpdate> =
    new EventEmitter<DashboardActionUpdate>();
  @Output() showHelp: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit() {
    this.currentDashboard = (this.dashboards.filter(
      (dashboard) => dashboard?.id === this.currentDashboardId
    ) || [])[0];
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
