import { Component, OnInit } from '@angular/core';
import { RouteModel } from 'src/app/models/RouteModel';
import { RouteService } from 'src/app/services/route.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-route-timing',
  templateUrl: './route-timing.component.html',
  styleUrls: ['./route-timing.component.scss']
})
export class RouteTimingComponent implements OnInit {
  formData = new RouteModel()
  RouteTimingList:any[]=[];
  filterRouteTimingList:any[]=[];
  routeList:any[]=[];
  filterRouteList:any[]=[];
  pageSize = 5;
  page = 1;
  btnTxt = "Save";
   constructor(private RouteService:RouteService,
    private SessionService:SessionService,
    private SharedService:SharedService,
   private dialog: MatDialog,){

   }


   ngOnInit(){
    //this.loadRoute();
    this.getRouteTiming();
   }


   OpenPaymentDialog(data:any): void {
    // console.log("data year code",data)
    // this.dialog.open(PaymentCyclePopupComponent, {
    //   data:{
    //     formData:data,
    //   }
    // }).afterClosed().subscribe((data:any)=>{
    //   if(data!=undefined){
    //   }
      
    // });
  }


  



   getRouteTiming(){
    this.formData.Action = "Get_All_Route_Timming"
    this.formData.Company_Code = this.SessionService.getCurrentUser().value.CompanyCode
    this.RouteService.getAllRoute(this.formData).subscribe((res:any)=>{
      console.log("year ist",res.result)
      if(res.status==200 && res.result.Table1.length>0){
        this.RouteTimingList = res.result.Table;
        this.routeList =  res.result.Table1;
        this.filterRouteList = this.routeList.slice();
      }
    })
   }

   addRouteTimimg(){
    this.formData.Company_Code = this.SessionService.getCurrentUser().value.CompanyCode;
    this.formData.User_ID = this.SessionService.getCurrentUser().value.UserId;
    
    if(this.btnTxt=="Update"){
      this.formData.Action='Update_Timing'
    }
    else{
      this.formData.Action='Add_Timing'
    }
   
    this.RouteService.getAllRoute(this.formData).subscribe((res:any)=>{
      console.log(res.result.Table[0])
      if(res.status==200 && res.result.Table.length>0){
    this.SharedService.openSnackBar(res.result.Table[0].message);
    this.reset();
    this.getRouteTiming();
      }
      else{
        this.SharedService.openSnackBar(res.result.Table[0].message)
      }
    })
   }

   reset(){
    this.btnTxt = "Save"
    this.formData.Route_Code=0;
   }

   onEdit(e:any){
    this.btnTxt = "Update"
  this.formData.Effective_Date = e.Effective_Date;
  this.formData.Route_Code = e.Route_Code;
  this.formData.Route_Name=e.Route_Name;
  this.formData.Scheduled_Evening_Time=e.Scheduled_Evening_Time
   this.formData.Scheduled_Morning_Time=e.Scheduled_Morning_Time

   }
}

