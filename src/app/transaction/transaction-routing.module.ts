import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfterLoginGuard } from '../guards/after-login.guard';
import { DispatchCollectionComponent } from './dispatch-collection/dispatch-collection.component';
import { DockCollectionComponent } from './dock-collection/dock-collection.component';
import { LabCollectionComponent } from './lab-collection/lab-collection.component';
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

      {
        path:'lab-collection',
        component: LabCollectionComponent,
        data: {
          title: 'Lab Collection',
          urls: [{ title: 'Lab Collection', url: '/lab-collection' }, { title: 'New Lab Collection' }],
        },
        
      },
    ],
  },
  {
    path: 'dispatch-collection',
    component: DispatchCollectionComponent,
    data: {
      title: 'Dispatch Collection',
      urls: [{ title: 'Transaction', url: '/Dispatch-collection' }, { title: 'New Dispatch Collection' }],
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
export class TransactionRoutingModule { }
