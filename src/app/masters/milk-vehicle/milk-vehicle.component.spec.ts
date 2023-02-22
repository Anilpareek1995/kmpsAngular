import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkVehicleComponent } from './milk-vehicle.component';

describe('MilkVehicleComponent', () => {
  let component: MilkVehicleComponent;
  let fixture: ComponentFixture<MilkVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilkVehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MilkVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
