import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteTimingComponent } from './route-timing.component';

describe('RouteTimingComponent', () => {
  let component: RouteTimingComponent;
  let fixture: ComponentFixture<RouteTimingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteTimingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteTimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
