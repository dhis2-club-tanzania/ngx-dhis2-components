import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-description',
  templateUrl: './dashboard-description.component.html',
  styleUrls: ['./dashboard-description.component.scss'],
})
export class DashboardDescriptionComponent implements OnInit {
  @Input() description: string;
  constructor() {}

  ngOnInit(): void {}
}
