import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateRecalculationComponent } from './rate-recalculation.component';

describe('RateRecalculationComponent', () => {
  let component: RateRecalculationComponent;
  let fixture: ComponentFixture<RateRecalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateRecalculationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateRecalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
