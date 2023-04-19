import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabFilterComponent } from './lab-filter.component';

describe('LabFilterComponent', () => {
  let component: LabFilterComponent;
  let fixture: ComponentFixture<LabFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
