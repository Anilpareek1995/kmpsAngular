import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfterLoginGuard } from '../guards/after-login.guard';
import { UserRollComponent } from './user-roll/user-roll.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'User',
        component: UserComponent,
        data: {
          title: 'User',
          urls: [{ title: 'User', url: '/User' }, { title: 'New User' }],
        },
      },

      {
        path: 'User-role',
        component: UserRollComponent,
        data: {
          title: 'User Role',
          urls: [{ title: 'User Role', url: '/User-role' }, { title: 'New User Role' }],
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
export class UserManagementRoutingModule { }
