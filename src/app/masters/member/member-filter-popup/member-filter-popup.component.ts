import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BmcModel } from 'src/app/models/BmcModel';
import { MccModel } from 'src/app/models/MccModel';
import { MppModel } from 'src/app/models/MppModel';
import { BmcService } from 'src/app/services/bmc.service';
import { MccService } from 'src/app/services/mcc.service';
import { MppService } from 'src/app/services/mpp.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { SelectBmcForMppComponent } from '../../mpp/select-bmc-for-mpp/select-bmc-for-mpp.component';

@Component({
  selector: 'app-member-filter-popup',
  templateUrl: './member-filter-popup.component.html',
  styleUrls: ['./member-filter-popup.component.scss']
})
export class MemberFilterPopupComponent implements OnInit {
  BmcData = new BmcModel();
  MccData = new MccModel();
  MppData = new MppModel();
  mppIds:any;
  BmcList:any[]=[];
  filterBmcList:any[]=[];
  MccList:any[]=[];
  filterMccList:any[]=[];
  mppList:any[]=[];
  filterMppList:any[]=[];
 constructor(@Inject(MAT_DIALOG_DATA) private data: any,
 public dialogRef: MatDialogRef<MemberFilterPopupComponent>,
 private SharedService:SharedService,
 private SessionService:SessionService,
 private BmcService:BmcService,
 private mccService:MccService,
 private mppService:MppService){
 }

  ngOnInit(): void {
   this.getMccAll();
  }


 getBmcAll(e:any){
  this.BmcList=[];
  this.filterBmcList=[];  
  this.SharedService.openSppinerModel();
  this.BmcData.Comapny_Code =this.SessionService.getCurrentUser().value.CompanyCode;
  this.BmcData.Action ="Get_All_Center"
  this.BmcService.getBmcAll(this.BmcData).subscribe((res:any)=>{  
    if(res.status==200 && res.result.Table.length>0){
      this.SharedService.closeSpinnerModel();
      var ListBmc= res.result.Table;
      this.BmcList = ListBmc.filter((data:any)=>{
        return data.MCC_Name==e.value;
        
      })
      this.filterBmcList = this.BmcList
    }
    else{
      this.SharedService.closeSpinnerModel();
      this.SharedService.openSnackBar("No Data found");
    }
  })
  }

  getMppAll(e:any){
    console.log("Mpp",e.value)
    this.mppList=[];
    this.filterMppList=[];
    this.SharedService.openSppinerModel();
    this.MppData.Company_Code =this.SessionService.getCurrentUser().value.CompanyCode;
    this.MppData.User_Code =this.SessionService.getCurrentUser().value.UserId;
    this.MppData.Center_Code =e.value;
    this.MppData.Action  ="Get_All_Societies"
    this.mppService.getMppAll(this.MppData).subscribe((res:any)=>{  
      console.log("Mpp list",res)
      if(res.status==200 && res.result.Table.length>0){
        this.SharedService.closeSpinnerModel();
        var ListMpp= res.result.Table;
        this.mppList = ListMpp.filter((data:any)=>{
          return data.Center_Code==e.value;
        })
        this.filterMppList = this.mppList;
        console.log("this.MccList",this.mppList);
        
      }
      else{
        this.SharedService.closeSpinnerModel();
        this.SharedService.openSnackBar("No Data found");
      }
    })
    }

    
  

  getMccAll(){
    this.MccList=[];
    this.filterMccList = [];
    this.SharedService.openSppinerModel();
    this.MccData.Company_Code =this.SessionService.getCurrentUser().value.CompanyCode;
    this.MccData.Action ="Get_Data_Onload"
    this.mccService.getMccAll(this.MccData).subscribe((res:any)=>{  
      console.log("Mcc list",res)
      if(res.status==200 && res.result.Table1.length>0){
        this.SharedService.closeSpinnerModel();
        this.MccList = res.result.Table1;
        console.log("this.MccList",this.MccList);
        this.filterMccList = this.MccList.slice();
        
      }
      else{
        this.SharedService.closeSpinnerModel();
        this.SharedService.openSnackBar("No Data found");
      }
    })
    }


  onselectMpp(e:any){
    this.mppIds = e.value;
  }

  GetMember(){
    this.dialogRef.close(this.mppIds)
  }
}
