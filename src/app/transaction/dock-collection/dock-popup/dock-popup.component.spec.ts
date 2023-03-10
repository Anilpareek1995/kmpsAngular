import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockPopupComponent } from './dock-popup.component';

describe('DockPopupComponent', () => {
  let component: DockPopupComponent;
  let fixture: ComponentFixture<DockPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DockPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
