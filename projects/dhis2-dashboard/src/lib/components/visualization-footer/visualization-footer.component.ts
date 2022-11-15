import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-visualization-footer',
  templateUrl: './visualization-footer.component.html',
  styleUrls: ['./visualization-footer.component.css'],
})
export class VisualizationFooterComponent implements OnInit {
  @Input() visualizationType: string;
  @Output()
  visualizationTypeChange: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  onVisualizationTypeChange(type: string): void {
    this.visualizationTypeChange.emit(type);
  }
}
