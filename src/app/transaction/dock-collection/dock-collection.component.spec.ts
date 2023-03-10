import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockCollectionComponent } from './dock-collection.component';

describe('DockCollectionComponent', () => {
  let component: DockCollectionComponent;
  let fixture: ComponentFixture<DockCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DockCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
