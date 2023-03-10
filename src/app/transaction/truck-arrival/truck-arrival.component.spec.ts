import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckArrivalComponent } from './truck-arrival.component';

describe('TruckArrivalComponent', () => {
  let component: TruckArrivalComponent;
  let fixture: ComponentFixture<TruckArrivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruckArrivalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckArrivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
