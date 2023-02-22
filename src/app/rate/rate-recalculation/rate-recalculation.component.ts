import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RateRecalculationModel } from 'src/app/models/RateRecalculationModel';
import { BmcService } from 'src/app/services/bmc.service';
import { RatereCalculationService } from 'src/app/services/ratere-calculation.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-rate-recalculation',
  templateUrl: './rate-recalculation.component.html',
  styleUrls: ['./rate-recalculation.component.scss']
})
export class RateRecalculationComponent implements OnInit {
  formData = new RateRecalculationModel()
  bmclist:any[]=[];
  filterbmclist:any[]=[];
  pageSize = 5;
  page = 1;
   constructor(private rateservice:RatereCalculationService,
    private SessionService:SessionService,
    private SharedService:SharedService,
   private dialog: MatDialog,private bmcservice:BmcService){

   }


   ngOnInit(){
    this.getBmcAll();
   }




   getBmcAll(){
    var CompanyCode = this.SessionService.getCurrentUser().value.CompanyCode;
    var request = {Comapny_Code:CompanyCode,Action:"Get_All_Center"}
    this.bmcservice.getBmcAll(request).subscribe((res:any)=>{  
      if(res.status==200 && res.result.Table1.length>0){
        console.log("bmc liist",res.result);
        this.bmclist = res.result.Table;
        this.filterbmclist = this.bmclist.slice();
      }
      else{
        this.SharedService.openSnackBar("No Data found");
      }
    })
    }


   Recalculate(){
     this.formData.Action='Rate_Re_Calculation'
     this.formData.Cal_Type='Member Collection'
     this.formData. Company_Code=this.SessionService.getCurrentUser().value.CompanyCode
    this.rateservice.Raterecalculate(this.formData).subscribe((res:any)=>{
      console.log(res.result.Table[0])
      if(res.status==200 && res.result.Table.length>0){
    this.SharedService.openSnackBar(res.result.Table[0].message);
      }
      else{
        this.SharedService.openSnackBar(res.result.Table[0].message)
      }
    })
   }
}

