import { Injectable } from '@angular/core';
//import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from '../shared/loader/loader.component';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(public snackBar: MatSnackBar,private modalService:NgbModal,
    private SessionService:SessionService) { }

  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 2000,
      panelClass: ['text-bg-success'],
      verticalPosition: 'top',
      horizontalPosition: 'center',
     
    });
  }

  openSppinerModel() {
   this.modalService.open(LoaderComponent,{ centered: true });
   return true
	}

  closeSpinnerModel() {
    this.modalService.dismissAll(LoaderComponent);
    return false
   }

  ShowSnackBarWithAction(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  

 
}
