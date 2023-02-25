import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RoutePopupComponent } from 'src/app/masters/route-detail/route-popup/route-popup.component';
import { RouteModel } from 'src/app/models/RouteModel';
import { BmcService } from 'src/app/services/bmc.service';
import { MemberTransactionService } from 'src/app/services/member-transaction.service';
import { RouteService } from 'src/app/services/route.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { FilterTransactionComponent } from './filter-transaction/filter-transaction.component';

@Component({
  selector: 'app-member-transaction',
  templateUrl: './member-transaction.component.html',
  styleUrls: ['./member-transaction.component.scss']
})
export class MemberTransactionComponent implements OnInit {
  formData = {
    Society_Code:0,
    Route_Code:0,
    Center_Code:0,
    MCC_Id:0,
    Plant_Id:0,
    shift:"",
    Dump_Date:'',
    Action:"",
    Company_Code:0
  }
  RouteData = new RouteModel();
  RouteCodeList:any[] = [];
  filterRouteCodeList :any[] = [];
  MemberTransList:any[] = [];
  filterMemberTransList :any[] = [];
  BmcList:any[] = [];
  filterBmcList:any[] = [];
  pageSize = 5;
  page = 1;
    constructor(
    private sharedService:SharedService,
    private SessionService:SessionService,
    private RouteService:RouteService,
    private BmcService:BmcService,
    private dialog: MatDialog,
    private MemberTransactionService:MemberTransactionService){
    }
    ngOnInit(): void {
      this.getBmcAll();
    }
  
    getAllRoute(e:any){
      this.RouteCodeList = [];
      this.filterRouteCodeList = [];
     
      // this.SelectedBmcCode = e.value;
      console.log("this.formData.Center_Code.toString()",this.formData.Center_Code.toString());
       this.RouteData.Center_Code = this.formData.Center_Code.toString() //this.SelectedBmcCode
       this.RouteData.Company_Code =this.SessionService.getCurrentUser().value.CompanyCode;
       this.RouteData.Action = 'Get_All_Route';
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
  
      OpenRouteDialog(): void {
        
        this.dialog.open(FilterTransactionComponent, {
          data:{
            formData:this.formData,
          }
        }).afterClosed().subscribe((data:any)=>{
          if(data!=undefined){
            this.formData = data;
            this.getMemberTransaction();
          }
          
        });
      }


      getMemberTransaction(){
        this.formData.Action ='Get_data'
        this.formData.Dump_Date='2022-03-09'
        this.formData.Company_Code = this.SessionService.getCurrentUser().value.CompanyCode;
      this.MemberTransactionService.MemberTransactionAll(this.formData).subscribe((res:any)=>{
     if(res.status==200){
      console.log("member transaction",res.result)
      this.MemberTransList = res.result.Table;
      this.filterMemberTransList = this.MemberTransList.slice();
     }
        })
      }
  
  }
  
