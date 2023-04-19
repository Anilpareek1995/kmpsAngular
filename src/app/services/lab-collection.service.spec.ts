import { TestBed } from '@angular/core/testing';

import { LabCollectionService } from './lab-collection.service';

describe('LabCollectionService', () => {
  let service: LabCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
