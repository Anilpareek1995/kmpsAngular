import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { SharedMaterialModule } from '../shared-material-module';
import { UserComponent } from './user/user.component';
import { UserPopupComponent } from './user/user-popup/user-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from "angular-datatables";
import { UserRollComponent } from './user-roll/user-roll.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { UserRollPopupComponent } from './user-roll/user-roll-popup/user-roll-popup.component';




@NgModule({
  declarations: [
    UserComponent,
    UserPopupComponent,
    UserRollComponent,
    UserRollPopupComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    SharedMaterialModule,
    RouterModule,
    SharedModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class UserManagementModule { }
