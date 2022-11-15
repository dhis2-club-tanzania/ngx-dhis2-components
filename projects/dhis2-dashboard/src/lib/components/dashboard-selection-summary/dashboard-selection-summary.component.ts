import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { find } from 'lodash';

@Component({
  selector: 'app-dashboard-selection-summary',
  templateUrl: './dashboard-selection-summary.component.html',
  styleUrls: ['./dashboard-selection-summary.component.scss'],
})
export class DashboardSelectionSummaryComponent implements OnInit {
  @Input() dataSelections: any[];

  @Output() removeSelection: EventEmitter<any[]> = new EventEmitter<any[]>();
  constructor() {}

  ngOnInit(): void {}

  onRemoveSelection(e, dimension: string) {
    e.stopPropagation();

    const availableSelection = find(this.dataSelections, [
      'dimension',
      dimension,
    ]);

    if (availableSelection) {
      const indexToRemove = this.dataSelections.indexOf(availableSelection);
      this.removeSelection.emit([
        ...this.dataSelections.slice(0, indexToRemove),
        ...this.dataSelections.slice(indexToRemove + 1),
      ]);
    }
  }
}
