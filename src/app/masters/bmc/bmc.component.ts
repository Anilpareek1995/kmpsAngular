import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BmcModel } from 'src/app/models/BmcModel';
import { MccModel } from 'src/app/models/MccModel';
import { BmcService } from 'src/app/services/bmc.service';
import { MccService } from 'src/app/services/mcc.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { BmcPopupComponent } from './bmc-popup/bmc-popup.component';

@Component({
  selector: 'app-bmc',
  templateUrl: './bmc.component.html',
  styleUrls: ['./bmc.component.scss']
})
export class BmcComponent implements OnInit {
  pageSize = 5;
  page = 1;
  btnTxt="Save";
  BmcList:any[]=[];
  formdata = new BmcModel();
  filterBmcList: any[] = [];
  _filterBmctxt: string = "";
  constructor(private mccService:MccService,public dialog: MatDialog,
    private SharedService:SharedService,
    private SessionService:SessionService,
    private BmcService:BmcService){
  }


  ngOnInit(): void {
   console.log("session",this.SessionService.getCurrentUser())
    this._filterBmctxt=""
   this.getBmcAll();
  }


  getBmcAll(){
  this.BmcList=[];
  this.filterBmcList=[];
  this.SharedService.openSppinerModel();
  this.formdata.Comapny_Code =this.SessionService.getCurrentUser().value.CompanyCode;
  this.formdata.Action ="Get_All_Center"
  this.BmcService.getBmcAll(this.formdata).subscribe((res:any)=>{  
    if(res.status==200 && res.result.Table1.length>0){
      console.log("Bmc list",res)
      this.SharedService.closeSpinnerModel();
      this.BmcList = res.result.Table;
      this.filterBmcList = this.BmcList;
    }
    else{
      this.SharedService.closeSpinnerModel();
      this.SharedService.openSnackBar("No Data found");
    }
  })
  }


  openDialog(): void {
    this.dialog.open(BmcPopupComponent, {
      width:'100%',
      data:{
        formData:this.formdata,
        btnTxt:this.btnTxt
      }
    }).afterClosed().subscribe((data:any)=>{
      
      this.reset();
      this.getBmcAll();
      
    });
  }


  reset(){
    this.btnTxt="Save";
    this.formdata.Action = "";
    this.formdata.Center_Code = 0;
    this.formdata.MCC_Id = 0;
    this.formdata.Address = "";
    this.formdata.Center_Name = "";
    this.formdata.MCC_Code = 0;
    this.formdata.Is_Active = 0;
    this.formdata.Country_Code = 0;
    this.formdata.PinCode = 0;
    this.formdata.Other_Code = "";
    this.formdata.Village_Id = 0;
    this.formdata.Hamlet_Id = 0;
    this.formdata.Plant_Id = 0;
    this.formdata.State_Code = 0;
    this.formdata.Village_Id = 0;
    this.formdata.Sub_District_Id = 0;
    this.formdata.User_ID = 0;
  }

  onEditUser(e:any){
  this.btnTxt = "Update";
  this.formdata = e;
  this.formdata.Is_Active = e.Is_Active
  this.openDialog();
  }


  get filterBmcName(){
    return this._filterBmctxt;
}

set filterBmcName(value:string){
  this._filterBmctxt = value;
  this.filterBmcList = this.filterMccByName(value)
}



filterMccByName(filterBmcterm:string){
 if(this.BmcList.length<0 || this.filterBmcName==""){
   return this.BmcList;
 }
 else{
   return this.BmcList.filter((data:any)=>{
     return (data.Plant_Name||data.Plant_Code||data.City).toLocaleLowerCase().includes(filterBmcterm)==filterBmcterm.includes(filterBmcterm.toLocaleLowerCase())
   })
 }
}


}
