import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MilkTankerModel } from 'src/app/models/MilkTankerModel';
import { MilkTankerService } from 'src/app/services/milk-tanker.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { MilkVehiclePopupComponent } from './milk-vehicle-popup/milk-vehicle-popup.component';

@Component({
  selector: 'app-milk-vehicle',
  templateUrl: './milk-vehicle.component.html',
  styleUrls: ['./milk-vehicle.component.scss']
})
export class MilkVehicleComponent implements OnInit {
  formData = new MilkTankerModel();
  milkTankerList:any[]=[];
  filterRouteTimingList:any[]=[];
  filtermilkTankerList:any[]=[];
  filterRouteList:any[]=[];
  pageSize = 5;
  page = 1;
  btnTxt = "Save";
   constructor(private MilkTankerService:MilkTankerService,
    private SessionService:SessionService,
    private SharedService:SharedService,
   private dialog: MatDialog,){

   }


   ngOnInit(){
    //this.loadRoute();
    this.getMilktankerAll();
   }


   openDialog(): void {
   
    this.dialog.open(MilkVehiclePopupComponent, {
      data:{
        formData:this.formData,
        btnTxt :this.btnTxt
      }
    }).afterClosed().subscribe((data:any)=>{
      this.getMilktankerAll()
      if(data!=undefined){
      }
      
    });
  }


  



   getMilktankerAll(){
    this.formData.Action = "Get_All_Tenker"
    this.formData.Company_Code = this.SessionService.getCurrentUser().value.CompanyCode
    this.MilkTankerService.MilkTankerAll(this.formData).subscribe((res:any)=>{
      console.log("year ist",res.result)
      if(res.status==200 && res.result.Table.length>0){
        this.milkTankerList = res.result.Table;
        this.filtermilkTankerList =  this.milkTankerList.slice();
      }
    })
   }

   

   reset(){
    this.btnTxt = "Save"
    this.formData.Route_Contractor_Code = 0
   }

   onEdit(e:any){
    
    this.btnTxt = "Update"
  this.formData.Capacity=  e.Capacity;
  this.formData.Mobile_No=  e.Mobile_No;
  this.formData.Route_Contractor_Code=  e.Route_Contractor_Code;
  this.formData.Vehicle_Name=  e.Vehicle_Name;
  this.formData.Type=  e.Type;
  this.formData.Vehicle_Code=  e.Vehicle_Code;
  this.formData.Mobile_No=  e.Mobile_No;
    this.openDialog()
  

   }
}
