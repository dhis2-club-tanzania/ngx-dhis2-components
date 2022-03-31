import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-items-list',
  templateUrl: './dashboard-items-list.component.html',
  styleUrls: ['./dashboard-items-list.component.css'],
})
export class DashboardItemsListComponent implements OnInit {
  @Input() dashboardItems: any[];

  constructor() {}

  ngOnInit(): void {}
}
