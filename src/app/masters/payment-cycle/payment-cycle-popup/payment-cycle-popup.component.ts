import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MccModel } from 'src/app/models/MccModel';
import { PaymentCycleModel } from 'src/app/models/PaymentCycleModel';
import { MccService } from 'src/app/services/mcc.service';
import { PaymentCycleService } from 'src/app/services/payment-cycle.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-payment-cycle-popup',
  templateUrl: './payment-cycle-popup.component.html',
  styleUrls: ['./payment-cycle-popup.component.scss']
})
export class PaymentCyclePopupComponent implements OnInit {
   PaymentList:any[]=[];
   mccLlist:any[]=[];
   filterMccList:any[]=[];
  formData = new PaymentCycleModel();
  mccData = new MccModel();
  pageSize = 5;
  page = 1;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  public dialogRef: MatDialogRef<PaymentCyclePopupComponent>,
  private PaymentService:PaymentCycleService,
  private SessionService:SessionService,
  private SharedService:SharedService,
  private mccService:MccService){

  }
  ngOnInit(): void {
    this.loadMcc();
    this.formData.year_code = this.data.formData.YearCode
    this.formData.company_code = this.SessionService.getCurrentUser().value.CompanyCode
    this.getSubPaymentCycle();
    
  }


  getSubPaymentCycle(){
    this.formData.Action="get_year_cycles"
    
  this.PaymentService.PaymentCycleAll(this.formData).subscribe((res:any)=>{
    if(res.status==200 && res.result.Table1.length>0){
      console.log("sub payment",res.result.Table1)
      this.PaymentList = res.result.Table1
    }
  })
  }

  addCycle(){
    this.formData.Action = 'add_year_cycle'
    this.PaymentService.PaymentCycleAll(this.formData).subscribe((res:any)=>{
      if(res.status==200 && res.result.Table.length>0){
        console.log("sub cycle ",res.result.Table[0].message)
        this.SharedService.openSnackBar("Added cycle Payment")
        this.getSubPaymentCycle();
      }
      else{
        this.SharedService.openSnackBar(res.result.Table[0].message)

      }
    })
  }

  loadMcc(){
    this.mccData.Company_Code =this.SessionService.getCurrentUser().value.CompanyCode;
    this.mccData.Action ="Get_Data_Onload"
    this.mccService.getMccAll(this.mccData).subscribe((res:any)=>{
      if(res.status==200 && res.result.Table1.length>0){
        console.log("mcc in payment",res.result.Table1);
         this.mccLlist=res.result.Table1;
         this.filterMccList = this.mccLlist.slice();
      }
    })
  }
}
