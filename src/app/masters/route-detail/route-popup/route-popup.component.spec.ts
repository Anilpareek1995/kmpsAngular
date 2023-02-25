import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutePopupComponent } from './route-popup.component';

describe('RoutePopupComponent', () => {
  let component: RoutePopupComponent;
  let fixture: ComponentFixture<RoutePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
