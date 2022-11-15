import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVisualizationItemComponent } from './dashboard-visualization-item.component';

describe('DashboardVisualizationItemComponent', () => {
  let component: DashboardVisualizationItemComponent;
  let fixture: ComponentFixture<DashboardVisualizationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardVisualizationItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardVisualizationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
