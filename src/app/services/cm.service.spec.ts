import { TestBed } from '@angular/core/testing';

import { CMService } from './cm.service';

describe('CMService', () => {
  let service: CMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
