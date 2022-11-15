import { Component, OnInit } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Fn } from '@iapps/function-analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  components: any[];
  constructor(private httpClient: NgxDhis2HttpClientService) {}
  ngOnInit() {
    this.httpClient.rootUrl().subscribe((rootUrl) => {
      if (Fn) {
        Fn.init({
          baseUrl: `${rootUrl}api/`,
        });
      }
    });
    this.components = [
      {
        id: 'http-client',
        name: 'Http Client',
      },
      { id: 'dictionary', name: 'Metadata Dictionary' },
      { id: 'org-unit-filter', name: 'Organisation Unit filter' },
      { id: 'period-filter', name: 'Period filter' },
      { id: 'data-filter', name: 'Data filter' },
      { id: 'org-unit-filter', name: 'Dimension filter' },
      { id: 'selection-filters', name: 'Selection Filters' },
      { id: 'dashboard', name: 'Dashboard' },
      { id: 'menu', name: 'Menu' },
    ];
  }
}
