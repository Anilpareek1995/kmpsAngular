import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MppPopupComponent } from './mpp-popup.component';

describe('MppPopupComponent', () => {
  let component: MppPopupComponent;
  let fixture: ComponentFixture<MppPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MppPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MppPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
