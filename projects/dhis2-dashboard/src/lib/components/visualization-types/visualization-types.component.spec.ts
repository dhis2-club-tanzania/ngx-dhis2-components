import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationTypesComponent } from './visualization-types.component';

describe('VisualizationTypesComponent', () => {
  let component: VisualizationTypesComponent;
  let fixture: ComponentFixture<VisualizationTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizationTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
