import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfterLoginGuard } from '../guards/after-login.guard';
import { BookingReportComponent } from './booking-report/booking-report.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Booking-report',
        canActivate:[AfterLoginGuard],
        component: BookingReportComponent,
        data: {
          title: 'Booking Report',
          urls: [{ title: 'Booking Report', url: '/Booking-report' }, { title: 'New Booking Report' }],
        },
      },
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
