import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationFiltersContainerComponent } from './visualization-filters-container.component';

describe('VisualizationFiltersContainerComponent', () => {
  let component: VisualizationFiltersContainerComponent;
  let fixture: ComponentFixture<VisualizationFiltersContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizationFiltersContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationFiltersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
