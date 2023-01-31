import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyModel } from 'src/app/models/Company.Model';
import { GeoGraphicModel } from 'src/app/models/DemoGraphic.Model';
import { PlantModel } from 'src/app/models/plantModel';
import { PlantService } from 'src/app/services/plant.service';
import { SharedService } from 'src/app/services/shared.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-plant-popup',
  templateUrl: './plant-popup.component.html',
  styleUrls: ['./plant-popup.component.scss']
})
export class PlantPopupComponent implements OnInit {
  formData = new PlantModel();
  statData = new GeoGraphicModel();
  btnTxt = "";
  _filterStateList:any[]=[];
  StateList:any[]=[];
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  public dialogRef: MatDialogRef<PlantPopupComponent>,
  private plantService:PlantService,
  private sharedService:SharedService,
  private stateService:StateService){

  }
  ngOnInit(): void {
    this.GetAllState();
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

  OnSavePlant(){
    if(this.formData.Plant_Id>0){
      this.formData.Action = "Update_Plant"
    }
    else{
      this.formData.Action = "Insert_Plant"
    }
    this.plantService.getplantAll(this.formData).subscribe((res:any)=>{
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

