import { TestBed } from '@angular/core/testing';

import { PaymentCycleService } from './payment-cycle.service';

describe('PaymentCycleService', () => {
  let service: PaymentCycleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentCycleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
