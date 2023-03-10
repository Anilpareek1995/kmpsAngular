import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TruckarrivalModel } from 'src/app/models/TruckArrivalModel';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { TruckArrivalService } from 'src/app/services/truck-arrival.service';
import { FilterTransactionComponent } from '../member-transaction/filter-transaction/filter-transaction.component';
import { TruckArrivalPopupComponent } from './truck-arrival-popup/truck-arrival-popup.component';

@Component({
  selector: 'app-truck-arrival',
  templateUrl: './truck-arrival.component.html',
  styleUrls: ['./truck-arrival.component.scss']
})
export class TruckArrivalComponent implements OnInit {
DockList:any[]=[];
pageSize = 5;
page = 1;
formData = new TruckarrivalModel();
  constructor(private sessionService:SessionService,
    private truckArrivalService:TruckArrivalService,
    private sharedService:SharedService,
    private dialog: MatDialog,){

    }
  ngOnInit(): void {
    this.GetRouteByCode();
  }


  OpenTruckeDialog(): void {
        
    this.dialog.open(TruckArrivalPopupComponent, {
      data:{
        formData:this.formData,
      }
    }).afterClosed().subscribe((data:any)=>{
      if(data!=undefined){
        
        this.formData = data;
        this.GetRouteByCode();
      }
      
    });
  }

  GetRouteByCode(){
    console.log("this.sessionService",this.sessionService.getCurrentUser().value)
    this.formData.Dump_Date = new Date().getDate().toString()
    this.formData.Company_Code = this.sessionService.getCurrentUser().value.CompanyCode;
    this.formData.Action = "Get_Route_By_Code"
    this.truckArrivalService.TruckArrivalAll(this.formData).subscribe((res:any)=>{
      console.log("route by dock",res.result)
      this.DockList = res.result.Table
    })
  }

}
