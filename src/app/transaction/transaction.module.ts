import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { MemberTransactionComponent } from './member-transaction/member-transaction.component';
import { FilterTransactionComponent } from './member-transaction/filter-transaction/filter-transaction.component';
import { MemberAddTransPopupComponent } from './member-transaction/member-add-trans-popup/member-add-trans-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { MatTimepickerModule } from 'mat-timepicker';
import { SharedMaterialModule } from '../shared-material-module';
import { SharedModule } from '../shared/shared.module';
import { TruckArrivalComponent } from './truck-arrival/truck-arrival.component';
import { TruckArrivalPopupComponent } from './truck-arrival/truck-arrival-popup/truck-arrival-popup.component';


@NgModule({
  declarations: [
    MemberTransactionComponent,
    FilterTransactionComponent,
    MemberAddTransPopupComponent,
    TruckArrivalComponent,
    TruckArrivalPopupComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
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
export class TransactionModule { }
