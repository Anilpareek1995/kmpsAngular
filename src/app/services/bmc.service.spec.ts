import { TestBed } from '@angular/core/testing';

import { BmcService } from './bmc.service';

describe('BmcService', () => {
  let service: BmcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BmcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
