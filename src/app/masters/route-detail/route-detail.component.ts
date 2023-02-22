import { Component, OnInit } from '@angular/core';
import { RouteModel } from 'src/app/models/RouteModel';
import { BmcService } from 'src/app/services/bmc.service';
import { RouteService } from 'src/app/services/route.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.scss']
})
export class RouteDetailComponent implements OnInit {

formData = new RouteModel();
RouteCodeList:any[] = [];
filterRouteCodeList :any[] = [];
BmcList:any[] = [];
filterBmcList:any[] = [];
pageSize = 5;
page = 1;
  constructor(
  private sharedService:SharedService,
  private SessionService:SessionService,
  private RouteService:RouteService,
  private BmcService:BmcService){
  }
  ngOnInit(): void {
    this.getBmcAll();
  }

  getAllRoute(e:any){
    this.RouteCodeList = [];
    this.filterRouteCodeList = [];
   
    // this.SelectedBmcCode = e.value;
    console.log("this.formData.Center_Code.toString()",this.formData.Center_Code.toString());
     this.formData.Center_Code = this.formData.Center_Code.toString() //this.SelectedBmcCode
     this.formData.Company_Code =this.SessionService.getCurrentUser().value.CompanyCode;
     this.formData.Action = 'Get_All_Route';
    this.RouteService.getAllRoute(this.formData).subscribe((res:any)=>{
     console.log("Get_All_Route",res);
     if(res.status==200){
      this.RouteCodeList =  res.result.Table;
      this.filterRouteCodeList = this.RouteCodeList.slice();
     }
    })
   }

   getBmcAll(){
    this.BmcList=[];
    this.filterBmcList=[];
    var CompanyCode = this.SessionService.getCurrentUser().value.CompanyCode;
    var request = {Comapny_Code:CompanyCode,Action:"Get_All_Center"}
    this.BmcService.getBmcAll(request).subscribe((res:any)=>{  
      if(res.status==200 && res.result.Table1.length>0){
        console.log("bmc liist",res.result);
        this.BmcList = res.result.Table;
        this.filterBmcList = this.BmcList.slice();
      }
      else{
        this.sharedService.openSnackBar("No Data found");
      }
    })
    }

}
