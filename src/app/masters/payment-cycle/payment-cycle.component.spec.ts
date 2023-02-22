import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCycleComponent } from './payment-cycle.component';

describe('PaymentCycleComponent', () => {
  let component: PaymentCycleComponent;
  let fixture: ComponentFixture<PaymentCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentCycleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
