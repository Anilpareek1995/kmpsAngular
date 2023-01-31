import { Component, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { BookingReportModel } from 'src/app/models/BookingReport.model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-filter-popup',
  templateUrl: './filter-popup.component.html',
  styleUrls: ['./filter-popup.component.scss']
})
export class FilterPopupComponent {
  formData = new BookingReportModel();
  btnTxt :string = "";
  constructor(private dialogRef:MatDialogRef<FilterPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
     private sharedService:SharedService) { 
     }

     ngOnInit(): void {
      this.formData = this.data.formData
      this.btnTxt = this.data.btnTxt
       
     }
   
     close(){
       this.dialogRef.close(this.formData);
     }
}
