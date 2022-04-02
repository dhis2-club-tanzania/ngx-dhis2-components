import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dhis2-dashboard',
  templateUrl: './dhis2-dashboard.component.html',
  styleUrls: ['./dhis2-dashboard.component.scss'],
})
export class Dhis2DashboardComponent implements OnInit {
  currentDashboardId: string = '';
  useDataStore: boolean = false;
  dataStoreKeyRef: string = 'ehs-surveillance';
  constructor() {}

  ngOnInit(): void {}

  onGetCurrentDashboard(id: string): void {
    // console.log(id);
    // this.currentDashboardId = id;
  }
}
