import { DashboardService } from './dashboard.service';
import { TestBed } from '@angular/core/testing';
import { HrisHttpClientModule } from 'projects/hris-http-client/src/public-api';

describe('DashboardService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        HrisHttpClientModule.forRoot({
          namespace: 'iapps',
          version: 1,
          models: {
            users: 'id',
          },
        }),
      ],
      providers: [DashboardService],
    })
  );

  it('should be created', () => {
    const service: DashboardService = TestBed.get(DashboardService);
    expect(service).toBeTruthy();
  });
});
