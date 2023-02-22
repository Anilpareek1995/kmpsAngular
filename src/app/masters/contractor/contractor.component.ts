import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContractorModel } from 'src/app/models/Contractor.Model';
import { RouteModel } from 'src/app/models/RouteModel';
import { ContractorService } from 'src/app/services/contractor.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { ContractorPopupComponent } from './contractor-popup/contractor-popup.component';

@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.scss']
})
export class ContractorComponent implements OnInit {
  formData = new ContractorModel();
  ContractorList:any[]=[];
  filterRouteTimingList:any[]=[];
  filterContractorList:any[]=[];
  filterRouteList:any[]=[];
  pageSize = 5;
  page = 1;
  btnTxt = "Save";
   constructor(private contractorService:ContractorService,
    private SessionService:SessionService,
    private SharedService:SharedService,
   private dialog: MatDialog,){

   }


   ngOnInit(){
    //this.loadRoute();
    this.getContractorAll();
   }


   openDialog(): void {
   
    this.dialog.open(ContractorPopupComponent, {
      data:{
        formData:this.formData,
        btnTxt :this.btnTxt
      }
    }).afterClosed().subscribe((data:any)=>{
      this.getContractorAll()
      if(data!=undefined){
      }
      
    });
  }


  



   getContractorAll(){
    this.formData.Action = "Get_All_Contractor"
    this.formData.Company_Code = this.SessionService.getCurrentUser().value.CompanyCode
    this.contractorService.getContractor(this.formData).subscribe((res:any)=>{
      console.log("year ist",res.result)
      if(res.status==200 && res.result.Table.length>0){
        this.ContractorList = res.result.Table;
        this.filterContractorList =  this.ContractorList.slice();
      }
    })
   }

   addRouteTimimg(){
    this.formData.Company_Code = this.SessionService.getCurrentUser().value.CompanyCode;
    this.formData.User_Id = this.SessionService.getCurrentUser().value.UserId;
    
    if(this.btnTxt=="Update"){
      this.formData.Action='Update_Timing'
    }
    else{
      this.formData.Action='Add_Timing'
    }
   
    this.contractorService.getContractor(this.formData).subscribe((res:any)=>{
      console.log(res.result.Table[0])
      if(res.status==200 && res.result.Table.length>0){
    this.SharedService.openSnackBar(res.result.Table[0].message);
    this.reset();
    this.getContractorAll();
      }
      else{
        this.SharedService.openSnackBar(res.result.Table[0].message)
      }
    })
   }

   reset(){
    this.btnTxt = "Save"
    this.formData.Contractor_Code = 0
   }

   onEdit(e:any){
    
    this.btnTxt = "Update"
  this.formData.Address=  e.Address;
  this.formData.City=  e.City;
  this.formData.Contractor_Code=  e.Contractor_Code;
  this.formData.Contractor_Name=  e.Contractor_Name;
  this.formData.Contractor_Rate=  e.Contractor_Rate;
  this.formData.Email_Id=  e.Email_Id;
  this.formData.Mobile_No=  e.Mobile_No;
    this.openDialog()
  

   }
}


