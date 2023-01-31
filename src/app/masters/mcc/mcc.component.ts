import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MccModel } from 'src/app/models/MccModel';
import { MccService } from 'src/app/services/mcc.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { MccPopupComponent } from './mcc-popup/mcc-popup.component';

@Component({
  selector: 'app-mcc',
  templateUrl: './mcc.component.html',
  styleUrls: ['./mcc.component.scss']
})
export class MccComponent implements OnInit {
  pageSize = 5;
  page = 1;
  btnTxt="Save";
  MccList:any[]=[];
  formdata = new MccModel();
  filterMccList: any[] = [];
  _filterMcctxt: string = "";
  constructor(private mccService:MccService,public dialog: MatDialog,
    private SharedService:SharedService,
    private SessionService:SessionService){
  }


  ngOnInit(): void {
   console.log("session",this.SessionService.getCurrentUser())
 
    this._filterMcctxt=""
   this.getAllMcc();
  }


  getAllMcc(){
  this.SharedService.openSppinerModel();
  this.MccList=[];
  this.filterMccList=[];
  this.formdata.Company_Code =this.SessionService.getCurrentUser().value.CompanyCode;
  this.formdata.Action ="Get_Data_Onload"
  this.mccService.getMccAll(this.formdata).subscribe((res:any)=>{  
    if(res.status==200 && res.result.Table1.length>0){
      console.log("mcc list",res)
      this.SharedService.closeSpinnerModel();
      this.MccList = res.result.Table1;
      this.filterMccList = this.MccList
    }
    else{
      this.SharedService.closeSpinnerModel();
      this.SharedService.openSnackBar("No Data found");
    }
  })
  }


  openDialog(): void {
    this.dialog.open(MccPopupComponent, {
      width:'100%',
      data:{
        formData:this.formdata,
        btnTxt:this.btnTxt
      }
    }).afterClosed().subscribe((data:any)=>{
      console.log("plant data after pop cloce")
      this.reset();
      this.getAllMcc();
      
    });
  }


  reset(){
    this.btnTxt="Save";
    this.formdata.Action = "";
    this.formdata.MCC_Code = "";
    this.formdata.MCC_Id = 0;
    this.formdata.Address_Line1 = "";
    this.formdata.MCC_Name = "";
    this.formdata.Contact_Person = "";
    this.formdata.Is_Active = 0;
    this.formdata.Country_Id = 0;
    this.formdata.Pincode = "";
    this.formdata.Other_Code = "";
    this.formdata.Address_Line2 = "";
    this.formdata.Email_Address = "";
    this.formdata.GST_Number = "";
    this.formdata.Hamlet_Id = 0;
    this.formdata.Phone_Number = "";
    this.formdata.Plant_Id = 0;
    this.formdata.State_Id = 0;
    this.formdata.Village_Id = 0;
    this.formdata.Sub_District_Id = 0;
    this.formdata.User_Id = 0;
  }

  onEditUser(e:any){
  this.btnTxt = "Update";
  this.formdata = e;
  this.formdata.Is_Active = e.Is_Active
  this.openDialog();
  }


  get filterMccName(){
    return this._filterMcctxt;
}

set filterMccName(value:string){
  this._filterMcctxt = value;
  this.filterMccList = this.filterMccByName(value)
}



filterMccByName(filterMccterm:string){
 if(this.MccList.length<0 || this.filterMccName==""){
   return this.MccList;
 }
 else{
   return this.MccList.filter((data:any)=>{
     return (data.Plant_Name||data.Plant_Code||data.City).toLocaleLowerCase().includes(filterMccterm)==filterMccterm.includes(filterMccterm.toLocaleLowerCase())
   })
 }
}


}
