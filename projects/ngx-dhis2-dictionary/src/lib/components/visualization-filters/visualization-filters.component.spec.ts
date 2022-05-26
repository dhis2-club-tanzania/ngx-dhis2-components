import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationFiltersComponent } from './visualization-filters.component';

describe('VisualizationFiltersComponent', () => {
  let component: VisualizationFiltersComponent;
  let fixture: ComponentFixture<VisualizationFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizationFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
