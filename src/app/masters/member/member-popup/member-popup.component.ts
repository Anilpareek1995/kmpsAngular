import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BmcModel } from 'src/app/models/BmcModel';
import { GeoGraphicModel } from 'src/app/models/DemoGraphic.Model';
import { MccModel } from 'src/app/models/MccModel';
import { MppModel } from 'src/app/models/MppModel';
import { PlantModel } from 'src/app/models/plantModel';
import { RouteModel } from 'src/app/models/RouteModel';
import { BmcService } from 'src/app/services/bmc.service';
import { MccService } from 'src/app/services/mcc.service';
import { MppService } from 'src/app/services/mpp.service';
import { PlantService } from 'src/app/services/plant.service';
import { RouteService } from 'src/app/services/route.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { StateService } from 'src/app/services/state.service';
import { BmcPopupComponent } from '../../bmc/bmc-popup/bmc-popup.component';

@Component({
  selector: 'app-member-popup',
  templateUrl: './member-popup.component.html',
  styleUrls: ['./member-popup.component.scss']
})
export class MemberPopupComponent implements OnInit {
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
  PlantList:any[]=[];
  filterPlantList:any[]=[];
  MccList:any[]=[];
  filterMccList:any[]=[];
  BmcList:any[]=[];
  filterBmcList:any[]=[];

  MppList :any[]=[];
  filterMppList:any[]=[];
 
 
 //  MccData = new MccModel();
   mppData  = new MppModel();
   GeoData = new GeoGraphicModel();
   RouteData = new RouteModel();
  btnTxt = "";
  isArrow:boolean = false;
  SelectedBmcCode = "";
  Icon = "";
 //  _filterStateList:any[]=[];
 //  StateList:any[]=[];
 //  _filterPlantList:any[]=[];
 //  PlantList:any[]=[];
 //  _filterMccList:any[]=[];
 //  MccList:any[]=[];
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  public dialogRef: MatDialogRef<MemberPopupComponent>,
 
  private sharedService:SharedService,
  private stateService:StateService,
  private mccService:MccService,
  private SessionService:SessionService,
  private mppSerice:MppService,
  private RouteService:RouteService,
  private plantService:PlantService,
  private BmcService:BmcService,
  private mppService:MppService

 ){
 
  }
  ngOnInit(): void {
  
   this.mppData = this.data.mppData;
   this.btnTxt = this.data.btnTxt;
   this.SelectedBmcCode = this.data.SelectedBmcCode;
   this.getAllRoute(0);
   this.GetAllState();
   this.getAllPlant();
   this.getAllMcc(0);
   this.getBmcAll(0);
   if(this.mppData.State_Code>0){
     this.GetAllDistrict(0);
     this.GetAlltehsil(0);
     this.GetAllVillage(0)
   }
  
  }

  optionOnOf(){
  this.isArrow = !this.isArrow
 this.Icon = this.isArrow?'ArrowDokeyboard_arrow_down':'ArrowDokeyboard_arrow_up';
  
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
   this.GeoData.StateId =this.mppData.State_Code;
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
   this.GeoData.DistrictId = this.mppData.District_Id
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
   this.GeoData.SubDistrictId =  this.mppData.Sub_District_Id
   this.GeoData.calltype = 'GetVillage';
  this.stateService.AllDemographic(this.GeoData).subscribe((res:any)=>{
   console.log("GetVillage",res);
   if(res.status==200){
    this.VillageList =  res.result.Table;
    this.filterVillageList = this.VillageList.slice();
   }
  })
 }
 
 getAllRoute(e:any){
  this.SelectedBmcCode = e.value;
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

 getAllPlant(){
this.PlantList=[];
this.filterPlantList=[];
var companyCode = this.SessionService.getCurrentUser().value.CompanyCode;
var request = {Action:"Get_Data_Onload",Company_Code:companyCode}
this.plantService.getplantAll(request).subscribe((res:any)=>{  
  if(res.status==200){
    this.PlantList = res.result.Table;
    this.filterPlantList = this.PlantList
  }
})
}

getAllMcc(e:any){
  this.MccList=[];
  this.filterMccList=[];
  var companyCode  = this.SessionService.getCurrentUser().value.CompanyCode;
  var request = {Company_Code:companyCode,Action:"Get_Data_Onload"}
  this.mccService.getMccAll(request).subscribe((res:any)=>{  
    if(res.status==200 && res.result.Table1.length>0){
      this.MccList = res.result.Table1;
      this.filterMccList = this.MccList
    }
    else{
      this.sharedService.openSnackBar("No Data found");
    }
  })
  }

  getBmcAll(e:any){
    this.BmcList=[];
    this.filterBmcList=[];
    var CompanyCode = this.SessionService.getCurrentUser().value.CompanyCode;
    var request = {Comapny_Code:CompanyCode,Action:"Get_All_Center"}
    this.BmcService.getBmcAll(request).subscribe((res:any)=>{  
      if(res.status==200 && res.result.Table1.length>0){
        this.BmcList = res.result.Table;
        this.filterBmcList = this.BmcList;
      }
      else{
        this.sharedService.openSnackBar("No Data found");
      }
    })
    }

    getMppAll(data:any){
      var CompanyCode = this.SessionService.getCurrentUser().value.CompanyCode;
      var request = {Company_Code:CompanyCode,Action:"Get_All_Societies"}
      this.mppService.getMppAll(request).subscribe((res:any)=>{  
        if(res.status==200){
          this.MppList = res.result.Table;
          this.filterMppList = this.MppList.slice();
        }
        else{
          this.sharedService.openSnackBar("No Data found");
        }
      })
      }
  


 
 
  OnSaveMpp(){
   this.mppData.Center_Code = this.SelectedBmcCode
   this.mppData.Company_Code =this.SessionService.getCurrentUser().value.CompanyCode;
   this.mppData.User_Code =this.SessionService.getCurrentUser().value.UserId;
    if(this.mppData.Society_Code>0){
      this.mppData.Action = "Update_Society"
    }
    else{
      this.mppData.Action = "Add_Society"
    }
    console.log("this.mppData.Company_Code",this.mppData.Company_Code);
    this.mppSerice.getMppAll(this.mppData).subscribe((res:any)=>{
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