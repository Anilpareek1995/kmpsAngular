import { TestBed } from '@angular/core/testing';

import { RateDetailService } from './rate-detail.service';

describe('RateDetailService', () => {
  let service: RateDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RateDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
