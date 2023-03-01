import { TestBed } from '@angular/core/testing';

import { RatereCalculationService } from './ratere-calculation.service';

describe('RatereCalculationService', () => {
  let service: RatereCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatereCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
