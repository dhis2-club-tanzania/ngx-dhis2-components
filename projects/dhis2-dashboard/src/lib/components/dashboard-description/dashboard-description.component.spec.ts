import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDescriptionComponent } from './dashboard-description.component';

describe('DashboardDescriptionComponent', () => {
  let component: DashboardDescriptionComponent;
  let fixture: ComponentFixture<DashboardDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
