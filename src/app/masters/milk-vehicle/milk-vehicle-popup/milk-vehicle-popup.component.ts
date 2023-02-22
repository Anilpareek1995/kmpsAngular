import { Component, Inject, OnInit } from '@angular/core';
import { MilkTankerModel } from 'src/app/models/MilkTankerModel';
import { MilkTankerService } from 'src/app/services/milk-tanker.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContractorModel } from 'src/app/models/Contractor.Model';
import { ContractorService } from 'src/app/services/contractor.service';


@Component({
  selector: 'app-milk-vehicle-popup',
  templateUrl: './milk-vehicle-popup.component.html',
  styleUrls: ['./milk-vehicle-popup.component.scss']
})
export class MilkVehiclePopupComponent implements OnInit {
  formData = new MilkTankerModel();
  contractorData = new ContractorModel();
  ContractorList:any[]=[];
  filterContractorList:any[]=[];
  btnTxt = "";
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  public dialogRef: MatDialogRef<MilkVehiclePopupComponent>,
  private milkTankerService:MilkTankerService,
  private sharedervice:SharedService,
  private SessionService:SessionService,
  private ContractorService:ContractorService){

  }
  ngOnInit(): void {
    this.getContractorAll();
    this.formData = this.data.formData
    this.btnTxt = this.data.btnTxt
  }

  onSave(){
    if(this.formData.Vehicle_Code>0){
   this.formData.Action = "Update_Tenker";

    }
    else{
   this.formData.Action = "Add_Tenker";

    }
    this.formData.Company_Code = this.SessionService.getCurrentUser().value.CompanyCode
    this.milkTankerService.MilkTankerAll(this.formData).subscribe((res:any)=>{
  if(res.status==200){
    this.sharedervice.openSnackBar(res.result.Table[0].message)
    this.close();
  }
    })
  }

  getContractorAll(){
    this.contractorData.Action = "Get_All_Contractor"
    this.contractorData.Company_Code = this.SessionService.getCurrentUser().value.CompanyCode
    this.ContractorService.getContractor(this.contractorData).subscribe((res:any)=>{
      console.log("contracotr list",res.result)
      if(res.status==200 && res.result.Table.length>0){
        this.ContractorList = res.result.Table;
        this.filterContractorList =  this.ContractorList.slice();
      }
    })
   }

  close(){
    this.dialogRef.close()
  }
}

