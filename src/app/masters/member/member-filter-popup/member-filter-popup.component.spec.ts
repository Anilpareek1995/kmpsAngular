import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberFilterPopupComponent } from './member-filter-popup.component';

describe('MemberFilterPopupComponent', () => {
  let component: MemberFilterPopupComponent;
  let fixture: ComponentFixture<MemberFilterPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberFilterPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberFilterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
