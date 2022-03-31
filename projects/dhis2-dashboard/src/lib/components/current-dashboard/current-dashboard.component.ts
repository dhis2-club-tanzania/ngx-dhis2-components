import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-current-dashboard',
  templateUrl: './current-dashboard.component.html',
  styleUrls: ['./current-dashboard.component.css'],
})
export class CurrentDashboardComponent implements OnInit {
  @Input() currentDashboard: any;
  constructor() {}

  ngOnInit(): void {}
}
