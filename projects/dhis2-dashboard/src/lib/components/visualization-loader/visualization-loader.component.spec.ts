import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationLoaderComponent } from './visualization-loader.component';

describe('VisualizationLoaderComponent', () => {
  let component: VisualizationLoaderComponent;
  let fixture: ComponentFixture<VisualizationLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizationLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
