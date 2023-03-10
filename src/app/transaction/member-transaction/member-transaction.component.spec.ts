import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberTransactionComponent } from './member-transaction.component';

describe('MemberTransactionComponent', () => {
  let component: MemberTransactionComponent;
  let fixture: ComponentFixture<MemberTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
