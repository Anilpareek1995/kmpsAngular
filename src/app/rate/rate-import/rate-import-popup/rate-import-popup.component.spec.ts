import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateImportPopupComponent } from './rate-import-popup.component';

describe('RateImportPopupComponent', () => {
  let component: RateImportPopupComponent;
  let fixture: ComponentFixture<RateImportPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateImportPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateImportPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
