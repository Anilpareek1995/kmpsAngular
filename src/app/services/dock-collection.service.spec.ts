import { TestBed } from '@angular/core/testing';

import { DockCollectionService } from './dock-collection.service';

describe('DockCollectionService', () => {
  let service: DockCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DockCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
