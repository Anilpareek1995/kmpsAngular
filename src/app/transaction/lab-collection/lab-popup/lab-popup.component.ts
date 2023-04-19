import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LabcollectionModel } from 'src/app/models/LabCollectionModel';
import { RouteModel } from 'src/app/models/RouteModel';
import { BmcService } from 'src/app/services/bmc.service';
import { LabCollectionService } from 'src/app/services/lab-collection.service';
import { RouteService } from 'src/app/services/route.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-lab-popup',
  templateUrl: './lab-popup.component.html',
  styleUrls: ['./lab-popup.component.scss']
})
export class LabPopupComponent implements OnInit {
  RouteCodeList :any[]= [];
  filterRouteCodeList:any[] = [];
  BmcList:any[]=[];
  filterBmcList:any[]=[];
  RouteData = new RouteModel();
  formData = new LabcollectionModel()
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  public dialogRef: MatDialogRef<LabPopupComponent>,
  private SessionService:SessionService,
   private SharedService:SharedService,
private labCollectionSerice:LabCollectionService,
private RouteService:RouteService,
private BmcService:BmcService)

  {    }

  
  ngOnInit(): void {
    this.formData = this.data.formData
   
  }

  onSaveLabCollection(){
    this.formData.Action = 'Update_Collection_Data';
    this.formData.Company_Code = this.SessionService.getCurrentUser().value.CompanyCode
    this.labCollectionSerice.labCollectionAll(this.formData).subscribe((res:any)=>{
      if(res.status==200){
        this.SharedService.openSnackBar(res.result.Table[0].message);
        this.close()
      }
      else{
        this.SharedService.openSnackBar(res.result.Table[0].message);

      }
    })
  }

  close(){
    this.dialogRef.close()
  }
  
}




