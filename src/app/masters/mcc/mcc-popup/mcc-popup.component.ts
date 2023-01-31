import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeoGraphicModel } from 'src/app/models/DemoGraphic.Model';
import { MccModel } from 'src/app/models/MccModel';
import { PlantModel } from 'src/app/models/plantModel';
import { MccService } from 'src/app/services/mcc.service';
import { PlantService } from 'src/app/services/plant.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-mcc-popup',
  templateUrl: './mcc-popup.component.html',
  styleUrls: ['./mcc-popup.component.scss']
})
export class MccPopupComponent implements OnInit {
  formData = new MccModel();
   statData = new GeoGraphicModel();
   plantData = new PlantModel();
  btnTxt = "";
  _filterStateList:any[]=[];
  StateList:any[]=[];
  _filterPlantList:any[]=[];
  PlantList:any[]=[];
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  public dialogRef: MatDialogRef<MccPopupComponent>,
  private plantService:PlantService,
  private sharedService:SharedService,
  private stateService:StateService,
  private mccService:MccService,
  private SessionService:SessionService){

  }
  ngOnInit(): void {
    this.plantData.Company_Code =this.SessionService.getCurrentUser().value.CompanyCode;
    this.GeAllPlant();
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

  OnSaveMcc(){
    if(this.formData.MCC_Id>0){
      this.formData.Action = "Update_MCC"
    }
    else{
      this.formData.Action = "Insert_MCC"
    }
    this.mccService.getMccAll(this.formData).subscribe((res:any)=>{
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