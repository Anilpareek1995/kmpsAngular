import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchCollectionComponent } from './dispatch-collection.component';

describe('DispatchCollectionComponent', () => {
  let component: DispatchCollectionComponent;
  let fixture: ComponentFixture<DispatchCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispatchCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispatchCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
