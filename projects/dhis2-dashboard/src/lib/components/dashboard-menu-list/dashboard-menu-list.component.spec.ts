import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMenuListComponent } from './dashboard-menu-list.component';
import { DashboardMenuItemComponent } from '../dashboard-menu-item/dashboard-menu-item.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FilterByNamePipe } from 'projects/dashboard/src/app/shared/pipes/filter-by-name.pipe';

describe('DashboardMenuListComponent', () => {
  let component: DashboardMenuListComponent;
  let fixture: ComponentFixture<DashboardMenuListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DashboardMenuListComponent, FilterByNamePipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
