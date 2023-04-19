import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabCollectionComponent } from './lab-collection.component';

describe('LabCollectionComponent', () => {
  let component: LabCollectionComponent;
  let fixture: ComponentFixture<LabCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
