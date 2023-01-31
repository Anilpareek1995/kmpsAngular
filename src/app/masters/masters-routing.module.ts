import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfterLoginGuard } from '../guards/after-login.guard';
import { UserComponent } from '../user-management/user/user.component';
import { BmcComponent } from './bmc/bmc.component';
import { CompanyComponent } from './company/company.component';
import { MccComponent } from './mcc/mcc.component';
import { MemberComponent } from './member/member.component';
import { MppComponent } from './mpp/mpp.component';
import { PlantComponent } from './plant/plant.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'company',
        component: CompanyComponent,
        data: {
          title: 'Company',
          urls: [{ title: 'Company', url: '/User' }, { title: 'New Company' }],
        },
      },

      {
        path: 'plant',
        component: PlantComponent,
        data: {
          title: 'Plant',
          urls: [{ title: 'Plant', url: '/plant' }, { title: 'New Plant' }],
        },
      },
      {
        path: 'mcc',
        component: MccComponent,
        data: {
          title: 'MCC',
          urls: [{ title: 'MCC', url: '/mcc' }, { title: 'New MCC' }],
        },
      },

      {
        path: 'bmc',
        component: BmcComponent,
        data: {
          title: 'BMC',
          urls: [{ title: 'BMC', url: '/bmc' }, { title: 'New BMC' }],
        },
      },

      {
        path: 'mpp',
        component: MppComponent,
        data: {
          title: 'MPP',
          urls: [{ title: 'MPP', url: '/mpp' }, { title: 'New MPP' }],
        },
      },

      {
        path: 'member',
        component: MemberComponent,
        data: {
          title: 'Member',
          urls: [{ title: 'Master', url: '/member' }, { title: 'New Member' }],
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
export class MastersRoutingModule { }
