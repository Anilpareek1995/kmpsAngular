import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LabcollectionModel } from 'src/app/models/LabCollectionModel';
import { BmcService } from 'src/app/services/bmc.service';
import { MccService } from 'src/app/services/mcc.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { LabFilterComponent } from '../../lab-collection/lab-filter/lab-filter.component';

@Component({
  selector: 'app-filter-dispatch',
  templateUrl: './filter-dispatch.component.html',
  styleUrls: ['./filter-dispatch.component.scss']
})
export class FilterDispatchComponent implements OnInit {
  BmcList:any[] = [];
  filterBmcList:any[]= [];
  MccList:any[] = [];
  filterMccList:any[]= [];
  formData = new LabcollectionModel();

  constructor(private SessionService:SessionService,
    @Inject(MAT_DIALOG_DATA) private data: any,
  public dialogRef: MatDialogRef<LabFilterComponent>,
   private BmcService:BmcService,
   private SharedService:SharedService,
   private mccService:MccService){

  }
  ngOnInit(): void {
    this.formData =this.data.formData;
    this.getBmcAll();
    this.getAllMcc();
  }



  getBmcAll(){
    this.BmcList = [];
    this.filterBmcList = [];
    var CompanyCode = this.SessionService.getCurrentUser().value.CompanyCode;
    var request = {Comapny_Code:CompanyCode,Action:"Get_All_Center"}
    this.BmcService.getBmcAll(request).subscribe((res:any)=>{  
      if(res.status==200 && res.result.Table1.length>0){
        this.BmcList = res.result.Table;
        this.filterBmcList = this.BmcList;
      }
      else{
        this.SharedService.openSnackBar("No Data found");
      }
    })
    }

   

      getAllMcc(){
        this.SharedService.openSppinerModel();
        this.MccList=[];
        this.filterMccList=[];
        var CompanyCode = this.SessionService.getCurrentUser().value.CompanyCode;
        var request = {Comapny_Code:CompanyCode,Action:"Get_Data_Onload"}
        this.mccService.getMccAll(request).subscribe((res:any)=>{  
          if(res.status==200 && res.result.Table1.length>0){
            console.log("mcc list",res)
            this.SharedService.closeSpinnerModel();
            this.MccList = res.result.Table1;
            this.filterMccList = this.MccList
          }
          else{
            this.SharedService.closeSpinnerModel();
            this.SharedService.openSnackBar("No Data found");
          }
        })
        }

        filterLab(){
         this.dialogRef.close(this.formData) 
        }

        close(){
          this.dialogRef.close()
        }

}

