import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAddTransPopupComponent } from './member-add-trans-popup.component';

describe('MemberAddTransPopupComponent', () => {
  let component: MemberAddTransPopupComponent;
  let fixture: ComponentFixture<MemberAddTransPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberAddTransPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberAddTransPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
