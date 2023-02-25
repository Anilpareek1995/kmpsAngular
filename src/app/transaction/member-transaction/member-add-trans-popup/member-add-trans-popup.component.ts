import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-member-add-trans-popup',
  templateUrl: './member-add-trans-popup.component.html',
  styleUrls: ['./member-add-trans-popup.component.scss']
})
export class MemberAddTransPopupComponent implements OnInit {
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
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<MemberAddTransPopupComponent>,
)
    {    }
  ngOnInit(): void {
    this.formData  = this.data.formData
  }
}
