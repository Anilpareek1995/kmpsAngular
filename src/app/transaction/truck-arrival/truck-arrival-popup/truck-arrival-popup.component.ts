import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { RouteModel } from 'src/app/models/RouteModel';
import { TruckarrivalModel } from 'src/app/models/TruckArrivalModel';
import { BmcService } from 'src/app/services/bmc.service';
import { RouteService } from 'src/app/services/route.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { TruckArrivalService } from 'src/app/services/truck-arrival.service';

@Component({
  selector: 'app-truck-arrival-popup',
  templateUrl: './truck-arrival-popup.component.html',
  styleUrls: ['./truck-arrival-popup.component.scss']
})
export class TruckArrivalPopupComponent implements OnInit {
  RouteCodeList :any[]= [];
  filterRouteCodeList:any[] = [];
  BmcList:any[]=[];
  filterBmcList:any[]=[];
  RouteData = new RouteModel();
  formData = new TruckarrivalModel()
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  public dialogRef: MatDialogRef<TruckArrivalPopupComponent>,
  private SessionService:SessionService,
   private SharedService:SharedService,
private truckArrivalService:TruckArrivalService,
private RouteService:RouteService,
private BmcService:BmcService)

  {    }

  time = { hour: 13, minute: 30 };
	meridian = true;
  model1!: string;
	model2!: string;
  ngOnInit(): void {
    this.getBmcAll()
  
    this.formData = this.data.formData
   
  }

  OnSavtruckArrival(){
 console.log("this.fordata",this.formData)
    this.formData.Action = 'Add_Route';
    this.formData.Company_Code = this.SessionService.getCurrentUser().value.CompanyCode
    this.truckArrivalService.TruckArrivalAll(this.formData).subscribe((res:any)=>{
      if(res.status==200){
        this.SharedService.openSnackBar(res.result.Table[0].message);
        this.OnselectShift();
      }
      else{
        this.SharedService.openSnackBar(res.result.Table[0].message);

      }
    })
  }

  onTimeChange(value:{hour:string,minute:string})
{
   console.log(value)
   this.formData.Arrival_Time=`${value.hour}:${value.minute}`;
}


  getAllRoute(e:any){
    this.RouteCodeList = [];
    this.filterRouteCodeList = [];
    // this.SelectedBmcCode = e.value;
     this.RouteData.Center_Code = e.value //this.SelectedBmcCode
     this.RouteData.Company_Code =this.SessionService.getCurrentUser().value.CompanyCode;
     this.RouteData.Action = 'Get_All_Route';
    this.RouteService.getAllRoute(this.RouteData).subscribe((res:any)=>{
     
     if(res.status==200){
      this.RouteCodeList =  res.result.Table;
      this.filterRouteCodeList = this.RouteCodeList.slice();
     }
    })
   }


   getBmcAll(){
    this.BmcList = [];
    this.filterBmcList = [];
    var CompanyCode = this.SessionService.getCurrentUser().value.CompanyCode;
    var request = {Comapny_Code:CompanyCode,Action:"Get_All_Center"}
    this.BmcService.getBmcAll(request).subscribe((res:any)=>{  
      if(res.status==200 && res.result.Table1.length>0){
        this.BmcList = res.result.Table;
        this.filterBmcList = this.BmcList;
      }
      else{
        this.SharedService.openSnackBar("No Data found");
      }
    })
    }

    OnselectShift(){
      this.dialogRef.close(this.formData);
    }
}



