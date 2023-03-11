import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCyclePopupComponent } from './payment-cycle-popup.component';

describe('PaymentCyclePopupComponent', () => {
  let component: PaymentCyclePopupComponent;
  let fixture: ComponentFixture<PaymentCyclePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentCyclePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentCyclePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
