import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  COLUMN_CHART_ICON,
  INFO_ICON,
  MAP_ICON,
  TABLE_ICON,
} from '../../shared/icons';

@Component({
  selector: 'lib-visualization-types',
  templateUrl: './visualization-types.component.html',
  styleUrls: ['./visualization-types.component.css'],
})
export class VisualizationTypesComponent implements OnInit {
  @Input() currentVisualization: string;
  @Output()
  visualizationTypeChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() onToggleInterpretation = new EventEmitter();

  tableIcon: string;
  chartIcon: string;
  mapIcon: string;
  infoIcon: string;

  constructor() {
    this.tableIcon = TABLE_ICON;
    this.chartIcon = COLUMN_CHART_ICON;
    this.mapIcon = MAP_ICON;
    this.infoIcon = INFO_ICON;
  }

  ngOnInit() {}

  onVisualizationSelect(e, type) {
    e.stopPropagation();
    this.visualizationTypeChange.emit(type);
    this.currentVisualization = type;
  }

  toggleInterpretaion(e) {
    e.stopPropagation();
    this.onToggleInterpretation.emit();
  }
}
