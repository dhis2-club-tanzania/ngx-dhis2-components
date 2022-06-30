import { Component, OnInit } from '@angular/core';
import {
  NgxDhis2HttpClientService,
  Manifest,
} from '@iapps/ngx-dhis2-http-client';

@Component({
  selector: 'app-http-client',
  templateUrl: './http-client.component.html',
  styleUrls: ['./http-client.component.scss'],
})
export class HttpClientComponent implements OnInit {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  ngOnInit(): void {
    this.httpClient.manifest().subscribe((manifest: Manifest) => {
      // console.log(manifest);
    });
    this.httpClient
      .get(
        'organisationUnits.json?fields=id,name,level,path,parent,children[id,name,level,path],dataSets&order=name:asc&filter=parent.id:eq:YmmeuGbqOwR&paging=false',
        {
          useIndexDb: true,
        }
      )
      .subscribe((orgUnits) => {
        // console.log(orgUnits);
      });
  }
}
