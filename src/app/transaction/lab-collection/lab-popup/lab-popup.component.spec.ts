import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabPopupComponent } from './lab-popup.component';

describe('LabPopupComponent', () => {
  let component: LabPopupComponent;
  let fixture: ComponentFixture<LabPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
