import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MastersRoutingModule } from './masters-routing.module';
import { SharedMaterialModule } from '../shared-material-module';
import { CompanyComponent } from './company/company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '../shared/shared.module';
import { CompanyPopupComponent } from './company/company-popup/company-popup.component';
import { PlantComponent } from './plant/plant.component';
import { PlantPopupComponent } from './plant/plant-popup/plant-popup.component';
import { MccComponent } from './mcc/mcc.component';
import { BmcComponent } from './bmc/bmc.component';
import { MccPopupComponent } from './mcc/mcc-popup/mcc-popup.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BmcPopupComponent } from './bmc/bmc-popup/bmc-popup.component';
import { MppComponent } from './mpp/mpp.component';
import { MppPopupComponent } from './mpp/mpp-popup/mpp-popup.component';
import { SelectBmcForMppComponent } from './mpp/select-bmc-for-mpp/select-bmc-for-mpp.component';
import { MemberComponent } from './member/member.component';
import { MemberFilterPopupComponent } from './member/member-filter-popup/member-filter-popup.component';
import { MemberPopupComponent } from './member/member-popup/member-popup.component';
import { PaymentCycleComponent } from './payment-cycle/payment-cycle.component';
import { PaymentCyclePopupComponent } from './payment-cycle/payment-cycle-popup/payment-cycle-popup.component';
import { RouteTimingComponent } from './route-timing/route-timing.component';
import { MatTimepickerModule } from 'mat-timepicker';
import { ContractorComponent } from './contractor/contractor.component';
import { ContractorPopupComponent } from './contractor/contractor-popup/contractor-popup.component';
import { MilkVehicleComponent } from './milk-vehicle/milk-vehicle.component';
import { MilkVehiclePopupComponent } from './milk-vehicle/milk-vehicle-popup/milk-vehicle-popup.component';
import { RouteDetailComponent } from './route-detail/route-detail.component';
import { RoutePopupComponent } from './route-detail/route-popup/route-popup.component';



@NgModule({
  declarations: [
    CompanyComponent,
    CompanyPopupComponent,
    PlantComponent,
    PlantPopupComponent,
    MccComponent,
    BmcComponent,
    MccPopupComponent,
    BmcPopupComponent,
    MppComponent,
    MppPopupComponent,
    SelectBmcForMppComponent,
    MemberComponent,
    MemberFilterPopupComponent,
    MemberPopupComponent,
    PaymentCycleComponent,
    PaymentCyclePopupComponent,
    RouteTimingComponent,
    ContractorComponent,
    ContractorPopupComponent,
    MilkVehicleComponent,
    MilkVehiclePopupComponent,
    RouteDetailComponent,
    RoutePopupComponent
  ],
  imports: [
    CommonModule,
    MastersRoutingModule,
    SharedMaterialModule,
    RouterModule,
    SharedModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    MatDatepickerModule,
    MatTimepickerModule 
    
  ]
})
export class MastersModule { }
