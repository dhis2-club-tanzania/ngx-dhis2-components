import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'lib-visualization-loader',
  templateUrl: './visualization-loader.component.html',
  styleUrls: ['./visualization-loader.component.css'],
})
export class VisualizationLoaderComponent implements OnInit {
  @Input() visualizationType: string;
  @Input() name: string;
  @Input() height: string;
  tableCellCounts: any[];
  chartBars: any[];

  constructor() {
    this.tableCellCounts = _.range(10);
    this.chartBars = ['70', '30', '80', '10', '30', '60'];
    this.height = '400px';
  }

  ngOnInit(): void {}
}
