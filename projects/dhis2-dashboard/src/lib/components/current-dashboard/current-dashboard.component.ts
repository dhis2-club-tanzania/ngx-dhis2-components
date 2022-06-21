import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-current-dashboard',
  templateUrl: './current-dashboard.component.html',
  styleUrls: ['./current-dashboard.component.css'],
})
export class CurrentDashboardComponent implements OnInit {
  @Input() currentDashboard: any;
  @Output() currentDashboardId: EventEmitter<string> =
    new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {

    console.log("here first : ", this.currentDashboard?.dashboardItems)

    this.currentDashboardId.emit(this.currentDashboard?.id);
  }
}
