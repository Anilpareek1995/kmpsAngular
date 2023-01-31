import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BmcModel } from 'src/app/models/BmcModel';
import { GeoGraphicModel } from 'src/app/models/DemoGraphic.Model';
import { MccModel } from 'src/app/models/MccModel';
import { PlantModel } from 'src/app/models/plantModel';
import { BmcService } from 'src/app/services/bmc.service';
import { MccService } from 'src/app/services/mcc.service';
import { PlantService } from 'src/app/services/plant.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-bmc-popup',
  templateUrl: './bmc-popup.component.html',
  styleUrls: ['./bmc-popup.component.scss']
})
export class BmcPopupComponent implements OnInit {
  MccData = new MccModel();
  formData  = new BmcModel();
   statData = new GeoGraphicModel();
   plantData = new PlantModel();
  btnTxt = "";
  _filterStateList:any[]=[];
  StateList:any[]=[];
  _filterPlantList:any[]=[];
  PlantList:any[]=[];
  _filterMccList:any[]=[];
  MccList:any[]=[];
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  public dialogRef: MatDialogRef<BmcPopupComponent>,
  private plantService:PlantService,
  private sharedService:SharedService,
  private stateService:StateService,
  private mccService:MccService,
  private SessionService:SessionService,
  private BmcService:BmcService){

  }
  ngOnInit(): void {
    this.plantData.Company_Code =this.SessionService.getCurrentUser().value.CompanyCode;
    this.GeAllPlant();
    this.getLoadAllMcc();
   this.formData = this.data.formData;
   this.btnTxt = this.data.btnTxt;
  }

  close(){

    this.dialogRef.close();
  }

  GetAllState(){
    this.statData.calltype = 'GetState';
   this.stateService.AllDemographic(this.statData).subscribe((res:any)=>{
    console.log("res",res);
    if(res.status==200){
     this.StateList =  res.result.Table;
     this._filterStateList = this.StateList.slice();
    
    }
   })
  }

  GeAllPlant(){
    this.plantData.Action ="Get_Data_Onload"
   this.plantService.getplantAll(this.plantData).subscribe((res:any)=>{
    console.log("plant res",res);
    if(res.status==200){
     this.PlantList =  res.result.Table;
     this._filterPlantList = this.PlantList.slice();
    }
   })
  }

  getLoadAllMcc(){
    this.MccData.Company_Code =this.SessionService.getCurrentUser().value.CompanyCode;
    this.MccData.Action ="Get_Data_Onload"
   this.mccService.getMccAll(this.MccData).subscribe((res:any)=>{
   
    if(res.status==200){
     this.MccList =  res.result.Table1;
     this._filterMccList = this.MccList.slice();
    }
   })
  }

  OnSaveBmc(){
    if(this.formData.Center_Code>0){
      this.formData.Comapny_Code =this.SessionService.getCurrentUser().value.CompanyCode;
      this.formData.Action = "Update_Center"
    }
    else{
      this.formData.Action = "Add_Center"
    }
    this.BmcService.getBmcAll(this.formData).subscribe((res:any)=>{
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