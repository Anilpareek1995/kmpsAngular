import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { AfterLoginGuard } from './guards/after-login.guard';
import { PermissionGuard } from './guards/permission.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,

    children: [
      {
        path: '',
        redirectTo: '/authentication/login',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        redirectTo: '/dashboards/dashboard1',
        pathMatch: 'full',
      },
      {
        path: 'dashboards',
        loadChildren: () =>
          import('./dashboards/dashboards.module').then((m) => m.DashboardsModule),
      },
      {
        path: 'charts',
        loadChildren: () => import('./charts/chartslib.module').then((m) => m.ChartslibModule),
      },
      // {
      //   path: 'Operations',
      //   canActivate: [AfterLoginGuard],
      //   loadChildren: () => import('./booking/booking.module').then((m) => m.BookingModule),
      // },
       {
        path: 'master',
        canActivate: [AfterLoginGuard],
        loadChildren: () => import('./masters/masters.module').then((m) => m.MastersModule),
      },
      {
        path: 'user-management',
        
        loadChildren: () => import('./user-management/user-management.module').then((m) => m.UserManagementModule),
      },
      // {
      //   path: 'freight',
      //   canActivate:[AfterLoginGuard],
      //   loadChildren: () => import('./frate-memo/frate-memo.module').then((m) => m.FrateMemoModule),
      // },
      //{
      //   path: 'FreightPayment',
      //   canActivate: [AfterLoginGuard],
      //   loadChildren: () => import('./freight-memo-payments/freight-memo-payments.module').then((m) => m.FreightMemoPaymentsModule),
      // },
      // {
      //   path: 'outstanding',
      //   canActivate: [AfterLoginGuard],
      //   loadChildren: () => import('./receive-outstanding/receive-outstanding.module').then((m) => m.ReceiveOutstandingModule),
      // },
      {
        path: 'Reports',
        canActivate: [AfterLoginGuard],
        loadChildren: () => import('./reports/reports.module').then((m) => m.ReportsModule),
      },
      
    ],
  },
  {
    path: '',
    component: AppBlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/404',
  },
];
