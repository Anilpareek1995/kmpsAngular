import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfterLoginGuard } from '../guards/after-login.guard';
import { DockCollectionComponent } from './dock-collection/dock-collection.component';
import { MemberTransactionComponent } from './member-transaction/member-transaction.component';
import { TruckArrivalComponent } from './truck-arrival/truck-arrival.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Member-collection',
        component: MemberTransactionComponent,
        data: {
          title: 'Member Collection',
          urls: [{ title: 'Transaction', url: '/Member-collection' }, { title: 'New Member Collection' }],
        },
        
      },

      {
        path:'Actual-transaction',
        children: [
          {
        path:'truck-arrival',
        component: TruckArrivalComponent,
        data: {
          title: 'Truck Arrival',
          urls: [{ title: 'Transaction', url: '/truck-arrival' }, { title: 'New Truck Arrival' }],
        },
        
      },

      {
        path:'dock-collection',
        component: DockCollectionComponent,
        data: {
          title: 'Dock Collection',
          urls: [{ title: 'Dock Collection', url: '/dock-collection' }, { title: 'New Dock Collection' }],
        },
        
      },
    ],
  }
    

      
    ],
    canActivate:[AfterLoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
