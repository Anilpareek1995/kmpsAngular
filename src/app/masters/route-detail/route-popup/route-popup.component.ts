import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContractorModel } from 'src/app/models/Contractor.Model';
import { MilkTankerModel } from 'src/app/models/MilkTankerModel';
import { RouteModel } from 'src/app/models/RouteModel';
import { UserModel } from 'src/app/models/User.Model';
import { BmcService } from 'src/app/services/bmc.service';
import { ContractorService } from 'src/app/services/contractor.service';
import { MilkTankerService } from 'src/app/services/milk-tanker.service';
import { RouteService } from 'src/app/services/route.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-route-popup',
  templateUrl: './route-popup.component.html',
  styleUrls: ['./route-popup.component.scss']
})
export class RoutePopupComponent implements OnInit {
VehicleList:any[]=[];
filterVehicleList:any[]=[];
BmcList:any[]=[];
filterBmcList:any[]=[];
UserList:any[]=[];
filterUserList:any[]=[];
ContractorList:any[]=[];
filterContractorList:any[]=[];
VehicleData = new MilkTankerModel();
formData = new RouteModel();
UserData = new UserModel();
contractorData = new ContractorModel();
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  public dialogRef: MatDialogRef<RoutePopupComponent>,
  private sharedService:SharedService,
  private SessionService:SessionService,
  private RouteService:RouteService,
  private vehicleservice:MilkTankerService,
  private BmcService:BmcService,
  private UserService:UserService,
  private ContractorService:ContractorService)
  {    }


  ngOnInit(): void {
    this.getMilktankerAll();
    this.getBmcAll();
    this.getContractorAll();
  }
 

  getMilktankerAll(){
    console.log("vehicl")
    this.VehicleData.Action = "Get_All_Tenker"
    this.VehicleData.Company_Code = this.SessionService.getCurrentUser().value.CompanyCode
    this.vehicleservice.MilkTankerAll(this.VehicleData).subscribe((res:any)=>{
      console.log("vehicle ist",res.result)
      if(res.status==200 && res.result.Table.length>0){
        this.VehicleList = res.result.Table;
        this.filterVehicleList =  this.VehicleList.slice();
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

    getContractorAll(){
      this.contractorData.Action = "Get_All_Contractor"
      this.contractorData.Company_Code = this.SessionService.getCurrentUser().value.CompanyCode
      this.ContractorService.getContractor(this.contractorData).subscribe((res:any)=>{
        console.log("contractor",res.result)
        if(res.status==200 && res.result.Table.length>0){
          this.ContractorList = res.result.Table;
          this.filterContractorList =  this.ContractorList.slice();
        }
      })
     }

     OnSave(){
      if(this.formData.Route_Code>0){
        this.formData.Action="Update_Route"
      }
      else{
        this.formData.Action="Add_Route"

      }
      this.formData.Company_Code =this.SessionService.getCurrentUser().value.CompanyCode;
      this.formData.User_ID =191;
      this.RouteService.getAllRoute(this.formData).subscribe((res:any)=>{
        if(res.status==200){
          this.sharedService.openSnackBar(res.result.Table[0].message)
        }
        else{
          this.sharedService.openSnackBar(res.result.Table[0].message)
        }
      })

     }

     close(){
      this.dialogRef.close();
     }


  


}
