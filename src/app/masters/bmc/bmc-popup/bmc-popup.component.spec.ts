import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmcPopupComponent } from './bmc-popup.component';

describe('BmcPopupComponent', () => {
  let component: BmcPopupComponent;
  let fixture: ComponentFixture<BmcPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BmcPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BmcPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
