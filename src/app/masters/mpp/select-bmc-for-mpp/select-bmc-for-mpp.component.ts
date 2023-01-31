import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BmcModel } from 'src/app/models/BmcModel';
import { BmcService } from 'src/app/services/bmc.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-select-bmc-for-mpp',
  templateUrl: './select-bmc-for-mpp.component.html',
  styleUrls: ['./select-bmc-for-mpp.component.scss']
})
export class SelectBmcForMppComponent implements OnInit {
  BmcData = new BmcModel()
  BmcList:any[]=[];
 constructor(@Inject(MAT_DIALOG_DATA) private data: any,
 public dialogRef: MatDialogRef<SelectBmcForMppComponent>,
 private SharedService:SharedService,
 private SessionService:SessionService,
 private BmcService:BmcService){

 }
  ngOnInit(): void {
  this.getBmcAll();
  }


 getBmcAll(){
  this.BmcList=[];
  this.SharedService.openSppinerModel();
  this.BmcData.Comapny_Code =this.SessionService.getCurrentUser().value.CompanyCode;
  this.BmcData.Action ="Get_All_Center"
  this.BmcService.getBmcAll(this.BmcData).subscribe((res:any)=>{  
    console.log("Bmc list",res)
    if(res.status==200 && res.result.Table1.length>0){
      this.SharedService.closeSpinnerModel();
      this.BmcList = res.result.Table;
      
    }
    else{
      this.SharedService.closeSpinnerModel();
      this.SharedService.openSnackBar("No Data found");
    }
  })
  }


  onselectBmc(e:any){
    console.log("Bmc lidatast",e)
    this.dialogRef.close(e)
  }
}
