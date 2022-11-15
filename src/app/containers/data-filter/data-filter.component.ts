import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DataFilterConfig } from 'projects/ngx-dhis2-data-filter/src/public-api';

@Component({
  selector: 'app-data-filter',
  templateUrl: './data-filter.component.html',
  styleUrls: ['./data-filter.component.scss'],
})
export class DataFilterComponent implements OnInit {
  dataObject: any;
  action: string;
  selectedDataItems: any[] = [];
  dataFilterConfig: DataFilterConfig = {
    singleSelection: false,
    enabledSelections: ['in', 'fn', 'de'],
    showGroupingButton: false,
  };
  constructor(private store: Store<any>) {}

  ngOnInit(): void {}

  onDataUpdate(dataObject, action) {
    // console.log(dataObject);
    this.dataObject = dataObject;
    this.action = action;
  }
}
