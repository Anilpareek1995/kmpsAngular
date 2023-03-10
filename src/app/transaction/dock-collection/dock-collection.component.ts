import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DockCollectionModel } from 'src/app/models/DockCollectionModel';
import { TruckarrivalModel } from 'src/app/models/TruckArrivalModel';
import { DockCollectionService } from 'src/app/services/dock-collection.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { TruckArrivalService } from 'src/app/services/truck-arrival.service';
import { TruckArrivalPopupComponent } from '../truck-arrival/truck-arrival-popup/truck-arrival-popup.component';
import { DockPopupComponent } from './dock-popup/dock-popup.component';

@Component({
  selector: 'app-dock-collection',
  templateUrl: './dock-collection.component.html',
  styleUrls: ['./dock-collection.component.scss']
})
export class DockCollectionComponent implements OnInit {
  DockList:any[]=[];
  pageSize = 5;
  page = 1;
  formData = new DockCollectionModel();
    constructor(private sessionService:SessionService,
      private truckArrivalService:TruckArrivalService,
      private sharedService:SharedService,
      private dialog: MatDialog,
      private DockCollectionService:DockCollectionService){
  
      }
    ngOnInit(): void {
      //this.GetDockCollection();
      this.OpenDockPopupDialog()
    }
  
  
    OpenDockPopupDialog(): void {
          
      this.dialog.open(DockPopupComponent, {
        data:{
          formData:this.formData,
        }
      }).afterClosed().subscribe((data:any)=>{

        console.log("after close popup dock")
        if(data!=undefined){
          
          this.formData = data;
          this.GetDockCollection();
        }
        
      });
    }
  
    GetDockCollection(){
      console.log("this.sessionService",this.sessionService.getCurrentUser().value)
      this.formData.Company_Code = this.sessionService.getCurrentUser().value.CompanyCode;
      this.formData.User_Code = this.sessionService.getCurrentUser().value.UserId;
      this.formData.Action = "Get_Dock_Collection_Data"
      this.DockCollectionService.DockCollectionAll(this.formData).subscribe((res:any)=>{
        console.log("route by dock",res.result)
        this.DockList = res.result.Table
      })
    }
  
  }
