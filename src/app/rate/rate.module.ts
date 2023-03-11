import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RateRoutingModule } from './rate-routing.module';
import { RateRecalculationComponent } from './rate-recalculation/rate-recalculation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { MatTimepickerModule } from 'mat-timepicker';
import { SharedMaterialModule } from '../shared-material-module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RateRecalculationComponent
  ],
  imports: [
    CommonModule,
    RateRoutingModule,SharedMaterialModule,
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
export class RateModule { }
