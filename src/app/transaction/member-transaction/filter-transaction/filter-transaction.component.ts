import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { RoutePopupComponent } from 'src/app/masters/route-detail/route-popup/route-popup.component';
import { ContractorModel } from 'src/app/models/Contractor.Model';
import { MilkTankerModel } from 'src/app/models/MilkTankerModel';
import { RouteModel } from 'src/app/models/RouteModel';
import { UserModel } from 'src/app/models/User.Model';
import { BmcService } from 'src/app/services/bmc.service';
import { ContractorService } from 'src/app/services/contractor.service';
import { MccService } from 'src/app/services/mcc.service';
import { MilkTankerService } from 'src/app/services/milk-tanker.service';
import { MppService } from 'src/app/services/mpp.service';
import { PlantService } from 'src/app/services/plant.service';
import { RouteService } from 'src/app/services/route.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import { MemberAddTransPopupComponent } from '../member-add-trans-popup/member-add-trans-popup.component';

@Component({
  selector: 'app-filter-transaction',
  templateUrl: './filter-transaction.component.html',
  styleUrls: ['./filter-transaction.component.scss']
})
export class FilterTransactionComponent implements OnInit {
  formData = {
    Society_Code:0,
    Route_Code:0,
    Center_Code:0,
    MCC_Id:0,
    Plant_Id:0,
    shift:"",
    Dump_Date:'',
    Action:"",
    Company_Code:0,
    Mpp_Name:"",
    Mcc_Name:"",
    Route_Name:"",
    Plant_Name:"",
    Bmc_Name:""
  }
  VehicleList:any[]=[];
  filterVehicleList:any[]=[];
  BmcList:any[]=[];
  filterBmcList:any[]=[];
  UserList:any[]=[];
  filterUserList:any[]=[];
  ContractorList:any[]=[];
  filterContractorList:any[]=[];
  VehicleData = new MilkTankerModel();
  RouteData = new RouteModel();
  UserData = new UserModel();


      PlantList:any[]=[];
      filterPlantList:any[]=[];
      filterMccList:any[]=[];
      MccList:any[]=[];
     
      RouteCodeList:any[]=[];
      filterRouteCodeList :any[]=[];
      MppList:any[]=[];
      filterMppList:any[]=[];
  contractorData = new ContractorModel();
    constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<FilterTransactionComponent>,
    private sharedService:SharedService,
    private SessionService:SessionService,
    private RouteService:RouteService,
    private vehicleservice:MilkTankerService,
    private BmcService:BmcService,
    private UserService:UserService,
    private ContractorService:ContractorService,
    private plantService:PlantService,
    private mccService:MccService,
    private mppService:MppService,
    private dialog: MatDialog,)
    {    }
  
  
    ngOnInit(): void {
     this.getAllPlant();

     this.formData = this.data.formData
    }



    OpenMemberAddDialog(): void {
        
      this.dialog.open(MemberAddTransPopupComponent, {
        data:{
          formData:this.formData,
        }
      }).afterClosed().subscribe((data:any)=>{
        if(data!=undefined){
          this.formData = data;
        }
        
      });
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
       this.close();
       }


       getAllRoute(e:any){
        this.RouteCodeList = [];
        this.filterRouteCodeList = [];
        this.MppList = [];
        this.filterMppList = [];
        // this.SelectedBmcCode = e.value;
         this.RouteData.Center_Code = e.value //this.SelectedBmcCode
         this.RouteData.Company_Code =this.SessionService.getCurrentUser().value.CompanyCode;
         this.RouteData.Action = 'Get_All_Route';
        this.RouteService.getAllRoute(this.RouteData).subscribe((res:any)=>{
         
         if(res.status==200){
          this.RouteCodeList =  res.result.Table;
          this.filterRouteCodeList = this.RouteCodeList.slice();
          var Bmc = this.BmcList.find((res:any)=>res.Center_Code == e.value )
              this.formData.Bmc_Name = Bmc.Center_Name;
              console.log("this Bmc_Name name",this.formData.Bmc_Name)
         }
        })
       }
      
       getAllPlant(){
        
      this.PlantList=[];
      this.filterPlantList=[];
      this.BmcList=[];
      this.filterMccList=[];
      this.BmcList=[];
      this.filterBmcList=[];
      this.RouteCodeList = [];
        this.filterRouteCodeList = [];
      this.MppList=[];
      this.filterMppList=[];
      var companyCode = this.SessionService.getCurrentUser().value.CompanyCode;
      var request = {Action:"Get_Data_Onload",Company_Code:companyCode}
      this.plantService.getplantAll(request).subscribe((res:any)=>{  
        if(res.status==200){
          console.log("plant",res.result.Table)
          this.PlantList = res.result.Table;
          this.filterPlantList = this.PlantList.slice();
        }
      })
      }
      
      getAllMcc(e:any){
        this.MccList=[];
        this.filterMccList=[];
        this.BmcList=[];
        this.RouteCodeList = [];
        this.filterRouteCodeList = [];
          this.filterBmcList=[];
          this.MppList=[];
          this.filterMppList=[];
        var companyCode  = this.SessionService.getCurrentUser().value.CompanyCode;
        var request = {Company_Code:companyCode,Action:"Get_Data_Onload"}
        this.mccService.getMccAll(request).subscribe((res:any)=>{  
          if(res.status==200 && res.result.Table1.length>0){
            this.MccList = res.result.Table1;
            this.filterMccList = this.MccList
            var plant = this.PlantList.find((res:any)=>res.Plant_Id == e.value )
              this.formData.Plant_Name = plant.Plant_Name;
              console.log("this plant name",this.formData.Plant_Name)
          }
          else{
            this.sharedService.openSnackBar("No Data found");
          }
        })
        }
      
        getBmcAll(e:any){
          this.BmcList=[];
          this.filterBmcList=[];
          this.MppList=[];
          this.filterMppList=[];
          var CompanyCode = this.SessionService.getCurrentUser().value.CompanyCode;
          var request = {Comapny_Code:CompanyCode,Action:"Get_All_Center"}
          this.BmcService.getBmcAll(request).subscribe((res:any)=>{  
            if(res.status==200 && res.result.Table1.length>0){
              this.BmcList = res.result.Table;
              this.filterBmcList = this.BmcList;
              var Mcc = this.MccList.find((res:any)=>res.MCC_Id == e.value )
              this.formData.Mcc_Name = Mcc.MCC_Name;
              console.log("this Mcc_Name name",this.formData.Mcc_Name)
            }
            else{
              this.sharedService.openSnackBar("No Data found");
            }
          })
          }
      
          getMppAll(data:any){
            this.MppList=[];
            this.filterMppList=[];
            var CompanyCode = this.SessionService.getCurrentUser().value.CompanyCode;
            var request = {Company_Code:CompanyCode,Center_Code:this.formData.Center_Code,Action:"Get_All_Societies"}
            this.mppService.getMppAll(request).subscribe((res:any)=>{  
              if(res.status==200){
                this.MppList = res.result.Table;
                this.filterMppList = this.MppList.slice();
                var Route = this.RouteCodeList.find((res:any)=>res.Route_Code == data.value )
                this.formData.Route_Name = Route.Route_Name;
                console.log("this Bmc_Name name",this.formData.Bmc_Name)
           }
              
              else{
                this.sharedService.openSnackBar("No Data found");
              }
            })
            }

            onMppselect(data:any){
              var Mpp = this.MppList.find((res:any)=>res.Society_Code == data.value )
                this.formData.Mpp_Name = Mpp.Society_Name;
                console.log("this Mpp_Name name",this.formData.Mpp_Name)
            }

           

  
       close(){
        this.dialogRef.close(this.formData);
       }

       closeWithOutData(){
        this.dialogRef.close();
       }

       get getformValidate(){
        if(this.formData.Center_Code>0 && this.formData.MCC_Id>0
        &&  this.formData.Plant_Id>0 && this.formData.Dump_Date!="" && this.formData.Route_Code>0
        && this.formData.Society_Code>0 && this.formData.shift!=""){
          return true;
        }
        else{
          return false
        }
       }

      }
