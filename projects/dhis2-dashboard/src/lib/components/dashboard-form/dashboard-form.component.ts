import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Dashboard } from '../../models/dashboard.model';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { DashboardFormUpdate } from '../../models/dashboard-form-update.model';

@Component({
  selector: 'app-dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.scss'],
})
export class DashboardFormComponent implements OnInit {
  @Input() dashboard: Dashboard;

  dashboardFormDetails: Dashboard;

  @Output() dashboardUpdate: EventEmitter<DashboardFormUpdate> =
    new EventEmitter<DashboardFormUpdate>();
  @Output() dashboardDelete: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  onSubmit(e, dashboardForm: NgForm) {
    e.stopPropagation();
    if (dashboardForm && dashboardForm.value) {
      const { name } = dashboardForm.value;
      this.dashboardUpdate.emit({
        action: 'SUBMIT',
        dashboard: {
          ...this.dashboard,
          ...dashboardForm.value,
          displayName: name,
        },
      });
    }
  }

  onClose(e) {
    e.stopPropagation();
    this.dashboardUpdate.emit({
      action: 'CLOSE',
      dashboard: this.dashboard,
    });
  }

  onDelete(e) {
    e.stopPropagation();
    this.dashboardDelete.emit();
  }
}
