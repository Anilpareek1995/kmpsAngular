import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Rate_Detail } from 'src/app/models/Rate_Detail.model';
import { PlantService } from 'src/app/services/plant.service';
import { RateDetailService } from 'src/app/services/rate-detail.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-rate-import-popup',
  templateUrl: './rate-import-popup.component.html',
  styleUrls: ['./rate-import-popup.component.scss']
})
export class RateImportPopupComponent {
 formData =new Rate_Detail() ;
 btnTxt="Add" ;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  public dialogRef: MatDialogRef<RateImportPopupComponent>,
  private RateDetailService:RateDetailService,
  private sharedService:SharedService,
 private sessionservice:SessionService){

  }
  ngOnInit(): void {
   
   this.formData = this.data.formData;
   this.btnTxt = this.data.btnTxt;
  }
  


  AddRate(){

    this.formData.Company_Code=this.sessionservice.getCurrentUser().value.CompanyCode
    this.formData.Action='Create_Rate_Code'
  

  
  this.RateDetailService.getRateAll(this.formData).subscribe((res:any)=>{
    if(res.status==200){
      if(res.result.Table[0].is_successful==1){
        this.sharedService.openSnackBar(res.result.Table[0].message)
        this.dialogRef.close();
      }
      else{
        this.sharedService.openSnackBar(res.result.Table[0].message)
        this.dialogRef.close();
      }
    }
  })

  }
}
