import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DashboardModeState } from '../../models/dashboard-mode.mode';

@Component({
  selector: 'app-dashboard-title',
  templateUrl: './dashboard-title.component.html',
  styleUrls: ['./dashboard-title.component.css'],
})
export class DashboardTitleComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;
  @Input() userIsAdmin: boolean;

  @Output() rename = new EventEmitter();
  @Output() delete = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onRename(e: Event) {
    e.stopPropagation();
    this.rename.emit();
  }

  onDelete(e: Event) {
    e.stopPropagation();
    this.delete.emit();
  }
}
