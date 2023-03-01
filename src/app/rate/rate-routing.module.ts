import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfterLoginGuard } from '../guards/after-login.guard';
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


    
    ],
    canActivate:[AfterLoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RateRoutingModule { }
