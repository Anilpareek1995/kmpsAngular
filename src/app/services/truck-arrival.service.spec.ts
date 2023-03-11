import { TestBed } from '@angular/core/testing';

import { TruckArrivalService } from './truck-arrival.service';

describe('TruckArrivalService', () => {
  let service: TruckArrivalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TruckArrivalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
