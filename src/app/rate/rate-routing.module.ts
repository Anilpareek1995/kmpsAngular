import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfterLoginGuard } from '../guards/after-login.guard';
import { RateImportComponent } from './rate-import/rate-import.component';
import { RateRecalculationComponent } from './rate-recalculation/rate-recalculation.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Rate-Recalculation',
        component: RateRecalculationComponent,
        data: {
          title: 'Rate-Recalculation',
          urls: [{ title: 'Rate-Recalculation', url: '/Rate-Recalculation' }, { title: 'New Rate-Recalculation' }],
        },
      },
      {
        path: 'Rate-Import',
        component: RateImportComponent,
        data: {
          title: 'Rate-Import',
          urls: [{ title: 'Rate-Import', url: '/Rate-Import' }, { title: 'New Rate-Import' }],
        },
      },


    
    ],
    canActivate:[AfterLoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RateRoutingModule { }
