import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfterLoginGuard } from '../guards/after-login.guard';
import { MemberTransactionComponent } from './member-transaction/member-transaction.component';

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

      
    ],
    canActivate:[AfterLoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
