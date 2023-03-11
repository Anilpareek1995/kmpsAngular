import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { PaymentCycleModel } from 'src/app/models/PaymentCycleModel';
import { PaymentCycleService } from 'src/app/services/payment-cycle.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { SelectBmcForMppComponent } from '../mpp/select-bmc-for-mpp/select-bmc-for-mpp.component';
import { PaymentCyclePopupComponent } from './payment-cycle-popup/payment-cycle-popup.component';

@Component({
  selector: 'app-payment-cycle',
  templateUrl: './payment-cycle.component.html',
  styleUrls: ['./payment-cycle.component.scss']
})
export class PaymentCycleComponent implements OnInit {
  formData = new PaymentCycleModel()
  yearPaymentist:any[]=[];
  filteryearPaymentist:any[]=[];
  pageSize = 5;
  page = 1;
   constructor(private paymentService:PaymentCycleService,
    private SessionService:SessionService,
    private SharedService:SharedService,
   private dialog: MatDialog,){

   }


   ngOnInit(){
    this.getYearCycle()
   }


   OpenPaymentDialog(data:any): void {
    console.log("data year code",data)
    this.dialog.open(PaymentCyclePopupComponent, {
      data:{
        formData:data,
      }
    }).afterClosed().subscribe((data:any)=>{
      if(data!=undefined){
      }
      
    });
  }



   getYearCycle(){
    this.formData.Action = "get_year_master"
    this.formData.company_code = this.SessionService.getCurrentUser().value.CompanyCode
    this.paymentService.PaymentCycleAll(this.formData).subscribe((res:any)=>{
      console.log("year ist",res.result)
      if(res.status==200 && res.result.Table1.length>0){
        this.yearPaymentist = res.result.Table;
      }
    })
   }

   addCyclePayment(){
    this.formData.Action='Add_payment_year'
    this.paymentService.PaymentCycleAll(this.formData).subscribe((res:any)=>{
      console.log(res.result.Table[0])
      if(res.status==200 && res.result.Table.length>0){
    this.SharedService.openSnackBar(res.result.Table[0].message);
    this.getYearCycle();
      }
      else{
        this.SharedService.openSnackBar(res.result.Table[0].message)
      }
    })
   }

   onYearSelected(event: MatDatepickerInputEvent<Date>) {
    const year = event.value ? event.value.getFullYear() : null;
  const input = event.target as unknown as HTMLInputElement;
  input.value = year ? year.toString() : '';
  }
}
