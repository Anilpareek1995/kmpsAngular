import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContractorModel } from 'src/app/models/Contractor.Model';
import { ContractorService } from 'src/app/services/contractor.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-contractor-popup',
  templateUrl: './contractor-popup.component.html',
  styleUrls: ['./contractor-popup.component.scss']
})
export class ContractorPopupComponent implements OnInit {
  formData = new ContractorModel();
  btnTxt = "";
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  public dialogRef: MatDialogRef<ContractorPopupComponent>,
  private contractorService:ContractorService,
  private sharedervice:SharedService,
  private SessionService:SessionService){

  }
  ngOnInit(): void {
    this.formData = this.data.formData
    this.btnTxt = this.data.btnTxt
  }

  onSave(){
    if(this.formData.Contractor_Code>0){
   this.formData.Action = "Update_Contractor";

    }
    else{
   this.formData.Action = "Add_Contractor";

    }
    this.formData.Company_Code = this.SessionService.getCurrentUser().value.CompanyCode
    this.contractorService.getContractor(this.formData).subscribe((res:any)=>{
  if(res.status==200){
    this.sharedervice.openSnackBar(res.result.Table[0].message)
    this.close();
  }
    })
  }

  close(){
    this.dialogRef.close()
  }
}
