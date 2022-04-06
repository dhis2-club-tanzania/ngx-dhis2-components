import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVisualizationSelectionSummaryComponent } from './dashboard-visualization-selection-summary.component';

describe('DashboardVisualizationSelectionSummaryComponent', () => {
  let component: DashboardVisualizationSelectionSummaryComponent;
  let fixture: ComponentFixture<DashboardVisualizationSelectionSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardVisualizationSelectionSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardVisualizationSelectionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
