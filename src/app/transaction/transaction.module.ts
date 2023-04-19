import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { MemberTransactionComponent } from './member-transaction/member-transaction.component';
import { FilterTransactionComponent } from './member-transaction/filter-transaction/filter-transaction.component';
import { MemberAddTransPopupComponent } from './member-transaction/member-add-trans-popup/member-add-trans-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { MatTimepickerModule } from 'mat-timepicker';
import { SharedMaterialModule } from '../shared-material-module';
import { SharedModule } from '../shared/shared.module';
import { TruckArrivalComponent } from './truck-arrival/truck-arrival.component';
import { TruckArrivalPopupComponent } from './truck-arrival/truck-arrival-popup/truck-arrival-popup.component';
import { DockCollectionComponent } from './dock-collection/dock-collection.component';
import { DockPopupComponent } from './dock-collection/dock-popup/dock-popup.component';
import { LabCollectionComponent } from './lab-collection/lab-collection.component';
import { LabPopupComponent } from './lab-collection/lab-popup/lab-popup.component';
import { LabFilterComponent } from './lab-collection/lab-filter/lab-filter.component';
import { DispatchCollectionComponent } from './dispatch-collection/dispatch-collection.component';
import { FilterDispatchComponent } from './Dispatch-collection/filter-dispatch/filter-dispatch.component';
import { DispatchPopupComponent } from './Dispatch-collection/dispatch-popup/dispatch-popup.component';


@NgModule({
  declarations: [
    MemberTransactionComponent,
    FilterTransactionComponent,
    MemberAddTransPopupComponent,
    TruckArrivalComponent,
    TruckArrivalPopupComponent,
    DockCollectionComponent,
    DockPopupComponent,
    LabCollectionComponent,
    LabPopupComponent,
    LabFilterComponent,
    DispatchCollectionComponent,
    FilterDispatchComponent,
    DispatchPopupComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    SharedMaterialModule,
    RouterModule,
    SharedModule,
    FormsModule,
    NgbModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    MatDatepickerModule,
    MatTimepickerModule 
  ]
})
export class TransactionModule { }
