import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckArrivalPopupComponent } from './truck-arrival-popup.component';

describe('TruckArrivalPopupComponent', () => {
  let component: TruckArrivalPopupComponent;
  let fixture: ComponentFixture<TruckArrivalPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruckArrivalPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckArrivalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
