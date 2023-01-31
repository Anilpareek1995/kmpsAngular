import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatLegacyDialog as MatDialog, MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

import { DashboardEmpComponent } from './dashboard-emp.component';

describe('DashboardEmpComponent', () => {
  let component: DashboardEmpComponent;
  let fixture: ComponentFixture<DashboardEmpComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DashboardEmpComponent],
        imports: [MatDialogModule],
        providers: [DatePipe],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
