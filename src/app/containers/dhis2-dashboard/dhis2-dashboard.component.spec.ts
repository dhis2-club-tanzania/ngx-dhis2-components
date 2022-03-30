import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dhis2DashboardComponent } from './dhis2-dashboard.component';

describe('Dhis2DashboardComponent', () => {
  let component: Dhis2DashboardComponent;
  let fixture: ComponentFixture<Dhis2DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dhis2DashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Dhis2DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
