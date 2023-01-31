import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlantModel } from 'src/app/models/plantModel';
import { PlantService } from 'src/app/services/plant.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { PlantPopupComponent } from './plant-popup/plant-popup.component';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.scss']
})
export class PlantComponent implements OnInit {
  pageSize = 5;
  page = 1;
  btnTxt="Save";
  PlantList:any[]=[];
  formdata = new PlantModel();
  filterPlantList: any[] = [];
  _filterplanttxt: string = "";
  constructor(private plantService:PlantService,public dialog: MatDialog,
    private SharedService:SharedService,
    private SessionService:SessionService){
  }


  ngOnInit(): void {
   console.log("session",this.SessionService.getCurrentUser())
   this.formdata.Company_Code =this.SessionService.getCurrentUser().value.CompanyCode;
    this._filterplanttxt=""
   this.getAllPlant();
  }


  getAllPlant(){
    this.SharedService.openSppinerModel();
  this.PlantList=[];
  this.filterPlantList=[];
  this.formdata.Action ="Get_Data_Onload"
  this.plantService.getplantAll(this.formdata).subscribe((res:any)=>{  
    if(res.status==200){
      console.log("plant list",res)
      this.SharedService.closeSpinnerModel();
      this.PlantList = res.result.Table;
      this.filterPlantList = this.PlantList
    }
  })
  }


  openDialog(): void {
    this.dialog.open(PlantPopupComponent, {
      width:'100%',
      data:{
        formData:this.formdata,
        btnTxt:this.btnTxt
      }
    }).afterClosed().subscribe((data:any)=>{
      console.log("plant data after pop cloce")
      this.reset();
      this.getAllPlant();
      
    });
  }


  reset(){
    this.btnTxt="Save";
    this.formdata.Action = "";
    this.formdata.Plant_Code = "";
    this.formdata.Address_Line1 = "";
    this.formdata.Plant_Name = "";
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


  get filterPlantName(){
    return this._filterplanttxt;
}

set filterPlantName(value:string){
  this._filterplanttxt = value;
  this.filterPlantList = this.filterPlantByName(value)
}



filterPlantByName(filterPlantterm:string){
 if(this.PlantList.length<0 || this.filterPlantName==""){
   return this.PlantList;
 }
 else{
   return this.PlantList.filter((data:any)=>{
     return (data.Plant_Name||data.Plant_Code||data.City).toLocaleLowerCase().includes(filterPlantterm)==filterPlantterm.includes(filterPlantterm.toLocaleLowerCase())
   })
 }
}


}
