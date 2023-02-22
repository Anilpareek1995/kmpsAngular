import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkVehiclePopupComponent } from './milk-vehicle-popup.component';

describe('MilkVehiclePopupComponent', () => {
  let component: MilkVehiclePopupComponent;
  let fixture: ComponentFixture<MilkVehiclePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilkVehiclePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MilkVehiclePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
