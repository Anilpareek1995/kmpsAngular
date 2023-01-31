import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MppComponent } from './mpp.component';

describe('MppComponent', () => {
  let component: MppComponent;
  let fixture: ComponentFixture<MppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
