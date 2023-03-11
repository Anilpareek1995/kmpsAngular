import { TestBed } from '@angular/core/testing';

import { MemberTransactionService } from './member-transaction.service';

describe('MemberTransactionService', () => {
  let service: MemberTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
