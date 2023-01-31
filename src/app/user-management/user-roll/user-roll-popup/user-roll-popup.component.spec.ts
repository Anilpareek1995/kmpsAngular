import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRollPopupComponent } from './user-roll-popup.component';

describe('UserRollPopupComponent', () => {
  let component: UserRollPopupComponent;
  let fixture: ComponentFixture<UserRollPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRollPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRollPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
