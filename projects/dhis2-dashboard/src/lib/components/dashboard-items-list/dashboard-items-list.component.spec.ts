import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardItemsListComponent } from './dashboard-items-list.component';

describe('DashboardItemsListComponent', () => {
  let component: DashboardItemsListComponent;
  let fixture: ComponentFixture<DashboardItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardItemsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
