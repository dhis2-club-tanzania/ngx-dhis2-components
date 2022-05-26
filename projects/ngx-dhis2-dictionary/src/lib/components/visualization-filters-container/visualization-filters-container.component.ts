import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'lib-visualization-filters-container',
  templateUrl: './visualization-filters-container.component.html',
  styleUrls: ['./visualization-filters-container.component.css'],
})
export class VisualizationFiltersContainerComponent implements OnInit {
  @Input() filterType: string;
  @Input() selections: any[];
  @Output() dimensionSelections: EventEmitter<any[]> = new EventEmitter<
    any[]
  >();
  selections$: Observable<any[]>;
  constructor() {}

  ngOnInit(): void {
    this.selections$ = of(this.selections);
  }

  onSetSelections(selections: any[]): void {
    // this.selections = selections;
    // console.log('NDANIIIIIII');
    this.selections$ = of(this.selections);
  }

  onGetSelections(selections: any[]): void {
    this.dimensionSelections.emit(selections);
  }
}
