import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Dashboard } from '../../models/dashboard.model';
import { DashboardPreferences } from '../../models/dashboard-preferences.model';
import { DashboardModeState } from '../../models/dashboard-mode.mode';

@Component({
  selector: 'app-dashboard-menu-list',
  templateUrl: './dashboard-menu-list.component.html',
  styleUrls: ['./dashboard-menu-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMenuListComponent implements OnInit {
  @Input() dashboards: Dashboard[];
  @Input() dashboardPreferences: DashboardPreferences;
  @Input() currentDashboardId: string;
  @Input() dashboardMode: DashboardModeState;
  @Input() userIsAdmin: boolean;

  searchTerm: string;
  currentDashboardsToShow: string = '0';

  @Output()
  setCurrentDashboard: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  addDashboard: EventEmitter<any> = new EventEmitter<any>();

  @Output() showHelp: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit() {}

  onSetCurrentDashboard(id: string) {
    this.setCurrentDashboard.emit(id);
  }

  onSearchDashboard(e) {
    e.stopPropagation();
    this.searchTerm = e.target.value.trim();
  }

  onAddDashboard(e) {
    e.stopPropagation();
    this.addDashboard.emit();
  }

  onShowHelpSection(e) {
    e.stopPropagation();
    this.showHelp.emit(true);
  }

  toggleDashboardsCount(event: Event, itemsCount: string): void {
    event.stopPropagation();
    this.currentDashboardsToShow = itemsCount === '0' ? 'all' : '0';
  }
}
