import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationFooterComponent } from './visualization-footer.component';

describe('VisualizationFooterComponent', () => {
  let component: VisualizationFooterComponent;
  let fixture: ComponentFixture<VisualizationFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizationFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
