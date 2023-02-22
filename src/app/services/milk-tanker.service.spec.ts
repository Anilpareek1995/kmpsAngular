import { TestBed } from '@angular/core/testing';

import { MilkTankerService } from './milk-tanker.service';

describe('MilkTankerService', () => {
  let service: MilkTankerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MilkTankerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
