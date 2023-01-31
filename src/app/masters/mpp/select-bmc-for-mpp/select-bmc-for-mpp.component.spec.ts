import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBmcForMppComponent } from './select-bmc-for-mpp.component';

describe('SelectBmcForMppComponent', () => {
  let component: SelectBmcForMppComponent;
  let fixture: ComponentFixture<SelectBmcForMppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectBmcForMppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectBmcForMppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
