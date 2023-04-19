import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LabcollectionModel } from 'src/app/models/LabCollectionModel';
import { MppModel } from 'src/app/models/MppModel';
import { RouteModel } from 'src/app/models/RouteModel';
import { BmcService } from 'src/app/services/bmc.service';
import { LabCollectionService } from 'src/app/services/lab-collection.service';
import { MppService } from 'src/app/services/mpp.service';
import { RouteService } from 'src/app/services/route.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { LabPopupComponent } from '../../lab-collection/lab-popup/lab-popup.component';

@Component({
  selector: 'app-dispatch-popup',
  templateUrl: './dispatch-popup.component.html',
  styleUrls: ['./dispatch-popup.component.scss']
})
export class DispatchPopupComponent implements OnInit {
  RouteCodeList :any[]= [];
  filterRouteCodeList:any[] = [];
  BmcList:any[]=[];
  filterBmcList:any[]=[];

  MppList:any[]=[];
  filterMppList:any[]=[];
  RouteData = new RouteModel();
  MppData = new MppModel()
  formData = new LabcollectionModel()
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  public dialogRef: MatDialogRef<LabPopupComponent>,
  private SessionService:SessionService,
   private SharedService:SharedService,
private labCollectionSerice:LabCollectionService,
private RouteService:RouteService,
private BmcService:BmcService,
private MppService:MppService)

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

  getMppAll(data:any){
    this.MppList=[];
    this.filterMppList=[];
    this.MppData.Center_Code = data
    this.MppData.Company_Code =this.SessionService.getCurrentUser().value.CompanyCode;
    this.MppData.Action ="Get_All_Societies"
    this.MppService.getMppAll(this.MppData).subscribe((res:any)=>{  
      if(res.status==200){
        this.SharedService.closeSpinnerModel();
        this.MppList = res.result.Table;
        this.filterMppList = this.MppList.slice();
      }
      else{
        this.SharedService.closeSpinnerModel();
        this.SharedService.openSnackBar("No Data found");
      }
    })
    }

  close(){
    this.dialogRef.close()
  }
  
}
