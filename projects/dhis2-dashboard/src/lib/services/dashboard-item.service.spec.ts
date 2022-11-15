import { DashboardItemService } from './dashboard-item.service';
import { TestBed } from '@angular/core/testing';
import { HrisHttpClientModule } from 'projects/hris-http-client/src/public-api';

describe('DashboardItemService', () => {
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
      providers: [DashboardItemService],
    })
  );

  it('should be created', () => {
    const service: DashboardItemService = TestBed.get(DashboardItemService);
    expect(service).toBeTruthy();
  });
});
