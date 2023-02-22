import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfterLoginGuard } from '../guards/after-login.guard';
import { UserComponent } from '../user-management/user/user.component';
import { BmcComponent } from './bmc/bmc.component';
import { CompanyComponent } from './company/company.component';
import { ContractorComponent } from './contractor/contractor.component';
import { MccComponent } from './mcc/mcc.component';
import { MemberComponent } from './member/member.component';
import { MilkVehicleComponent } from './milk-vehicle/milk-vehicle.component';
import { MppComponent } from './mpp/mpp.component';
import { PaymentCycleComponent } from './payment-cycle/payment-cycle.component';
import { PlantComponent } from './plant/plant.component';
import { RouteDetailComponent } from './route-detail/route-detail.component';
import { RouteTimingComponent } from './route-timing/route-timing.component';

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

      {
        path: 'payment-cycle',
        component: PaymentCycleComponent,
        data: {
          title: 'Payment Cycle',
          urls: [{ title: 'Master', url: '/payment-cycle' }, { title: 'New Payment Cycle' }],
        },
      },

      {
        path: 'route',
        children: [
          {
            path: 'route-detail',
            component: RouteDetailComponent,
            data: {
              title: 'Route Detail',
              urls: [{ title: 'Route', url: '/Route Detail' }, { title: 'New Route Detail' }],
            },
          } ,
          
          {
          path: 'route-timing',
          component: RouteTimingComponent,
          data: {
            title: 'Route Timing',
            urls: [{ title: 'Route', url: '/route-timing' }, { title: 'New Route Timing' }],
          },
        } ,
        {
          path: 'contractor',
          component: ContractorComponent,
          data: {
            title: 'Contractor',
            urls: [{ title: 'Route', url: '/contractor' }, { title: 'New Contractor' }],
          },
        },
        {
          path: 'milk-vehicle',
          component: MilkVehicleComponent,
          data: {
            title: 'Milk Vehicle',
            urls: [{ title: 'Route', url: '/milk-vehicle' }, { title: 'New Milk Vehicle' }],
          },
        }  ] 
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
