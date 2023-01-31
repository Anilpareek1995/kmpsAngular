import { TestBed } from '@angular/core/testing';

import { FreightMemoService } from './freight-memo.service';

describe('FreightMemoService', () => {
  let service: FreightMemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreightMemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
