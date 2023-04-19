import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDispatchComponent } from './filter-dispatch.component';

describe('FilterDispatchComponent', () => {
  let component: FilterDispatchComponent;
  let fixture: ComponentFixture<FilterDispatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterDispatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
