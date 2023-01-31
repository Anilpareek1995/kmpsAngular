import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MccPopupComponent } from './mcc-popup.component';

describe('MccPopupComponent', () => {
  let component: MccPopupComponent;
  let fixture: ComponentFixture<MccPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MccPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MccPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
