import { TestBed } from '@angular/core/testing';

import { GoodsRecieptService } from './goods-reciept.service';

describe('GoodsRecieptService', () => {
  let service: GoodsRecieptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoodsRecieptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
