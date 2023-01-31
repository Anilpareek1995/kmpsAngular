import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GeoGraphicModel } from 'src/app/models/DemoGraphic.Model';
import { MppModel } from 'src/app/models/MppModel';
import { RouteModel } from 'src/app/models/RouteModel';
import { MccService } from 'src/app/services/mcc.service';
import { MppService } from 'src/app/services/mpp.service';
import { RouteService } from 'src/app/services/route.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-mpp-popup',
  templateUrl: './mpp-popup.component.html',
  styleUrls: ['./mpp-popup.component.scss']
})
export class MppPopupComponent {
 StateList:any[] = [];
 filterStateList :any[]=[];
 DistrictList:any[]=[];
 filterDistrictList:any[]=[];
 TehsilList:any[]=[];
 filterTehsilList:any[]=[];
 VillageList:any[]=[];
 filterVillageList:any[]=[];
 RouteCodeList:any[]=[];
 filterRouteCodeList:any[]=[];



//  MccData = new MccModel();
  formData  = new MppModel();
  GeoData = new GeoGraphicModel();
  RouteData = new RouteModel();
 btnTxt = "";
 SelectedBmcCode = "";
//  _filterStateList:any[]=[];
//  StateList:any[]=[];
//  _filterPlantList:any[]=[];
//  PlantList:any[]=[];
//  _filterMccList:any[]=[];
//  MccList:any[]=[];
 constructor(@Inject(MAT_DIALOG_DATA) private data: any,
 public dialogRef: MatDialogRef<MppPopupComponent>,

 private sharedService:SharedService,
 private stateService:StateService,
 private mccService:MccService,
 private SessionService:SessionService,
 private mppSerice:MppService,
 private RouteService:RouteService
){

 }
 ngOnInit(): void {
 
  this.formData = this.data.formData;
  this.btnTxt = this.data.btnTxt;
  this.SelectedBmcCode = this.data.SelectedBmcCode;
  this.getAllRoute();
  this.GetAllState();
  if(this.formData.State_Code>0){
    this.GetAllDistrict(0);
    this.GetAlltehsil(0);
    this.GetAllVillage(0)
  }
 
 }

 close(){

   this.dialogRef.close();
 }

 GetAllState(){
   this.GeoData.calltype = 'GetState';
  this.stateService.AllDemographic(this.GeoData).subscribe((res:any)=>{
   if(res.status==200){
    this.StateList =  res.result.Table;
    this.filterStateList = this.StateList.slice();
   }
  })
 }

 GetAllDistrict(e:any){
  this.DistrictList = [];
  this.filterDistrictList=[];
  this.TehsilList = [];
  this.filterTehsilList= [];
  this.VillageList = [];
  this.filterVillageList = [];
  this.GeoData.calltype = 'GetDistrict';
  this.GeoData.StateId =this.formData.State_Code;
 this.stateService.AllDemographic(this.GeoData).subscribe((res:any)=>{
  if(res.status==200){
   this.DistrictList =  res.result.Table;
   this.filterDistrictList = this.DistrictList.slice();
  }
 })
}

GetAlltehsil(e:any){
  this.TehsilList = [];
  this.filterTehsilList= [];
  this.VillageList = [];
  this.filterVillageList = [];
  this.GeoData.DistrictId = this.formData.District_Id
  this.GeoData.calltype = 'GetTahsil';
 this.stateService.AllDemographic(this.GeoData).subscribe((res:any)=>{
  if(res.status==200){
   this.TehsilList =  res.result.Table;
   this.filterTehsilList = this.TehsilList.slice();
  }
 })
}

GetAllVillage(e:any){
  this.VillageList = [];
  this.filterVillageList = [];
  this.GeoData.SubDistrictId =  this.formData.Sub_District_Id
  this.GeoData.calltype = 'GetVillage';
 this.stateService.AllDemographic(this.GeoData).subscribe((res:any)=>{
  console.log("GetVillage",res);
  if(res.status==200){
   this.VillageList =  res.result.Table;
   this.filterVillageList = this.VillageList.slice();
  }
 })
}

getAllRoute(){
  this.RouteData.Center_Code = this.SelectedBmcCode
  this.RouteData.Company_Code =this.SessionService.getCurrentUser().value.CompanyCode;
  this.RouteData.Action = 'Get_All_Route';
 this.RouteService.getAllRoute(this.RouteData).subscribe((res:any)=>{
  console.log("Get_All_Route",res);
  if(res.status==200){
   this.RouteCodeList =  res.result.Table;
   this.filterRouteCodeList = this.RouteCodeList.slice();
  }
 })
}


 OnSaveMpp(){
  this.formData.Center_Code = this.SelectedBmcCode
  this.formData.Company_Code =this.SessionService.getCurrentUser().value.CompanyCode;
  this.formData.User_Code =this.SessionService.getCurrentUser().value.UserId;
   if(this.formData.Society_Code>0){
     this.formData.Action = "Update_Society"
   }
   else{
     this.formData.Action = "Add_Society"
   }
   console.log("this.formData.Company_Code",this.formData.Company_Code);
   this.mppSerice.getMppAll(this.formData).subscribe((res:any)=>{
     if(res.status==200){
       if(res.result.Table[0].is_successful==1){
         this.sharedService.openSnackBar(res.result.Table[0].message)
         this.dialogRef.close()
       }
       else{
         this.sharedService.openSnackBar(res.result.Table[0].message)
         this.dialogRef.close()
       }
       }
       else{
         this.sharedService.openSnackBar(res.message)
         this.dialogRef.close()
       }
      
     
   })
 }
}
