import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LabcollectionModel } from 'src/app/models/LabCollectionModel';
import { LabCollectionService } from 'src/app/services/lab-collection.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { LabFilterComponent } from './lab-filter/lab-filter.component';
import { LabPopupComponent } from './lab-popup/lab-popup.component';

@Component({
  selector: 'app-lab-collection',
  templateUrl: './lab-collection.component.html',
  styleUrls: ['./lab-collection.component.scss']
})
export class LabCollectionComponent implements OnInit {
  LabcollectionList:any[]=[];
  pageSize = 5;
  page = 1;
  formData = new LabcollectionModel();
    constructor(private sessionService:SessionService,
      private sharedService:SharedService,
      private dialog: MatDialog,
      private labCollectionService:LabCollectionService){
  
      }
    ngOnInit(): void {
      //this.GetDockCollection();
      this.OpenFilterDialog();
    }
  
  
    OpenLabPopupDialog(): void {
          
      this.dialog.open(LabPopupComponent, {
        data:{
          formData:this.formData,
        }
      }).afterClosed().subscribe((data:any)=>{

        console.log("after close popup dock")
        if(data!=undefined){
          
          this.formData = data;
          this.GetLabCollection();
        }
        
      });
    }

    OpenFilterDialog(): void {
          
      this.dialog.open(LabFilterComponent, {
        data:{
          formData:this.formData,
        }
      }).afterClosed().subscribe((data:any)=>{

        console.log("after close popup dock")
        if(data!=undefined){
          
          this.formData = data;
          this.GetLabCollection();
        }
        
      });
    }
  
    GetLabCollection(){
      console.log("this.sessionService",this.sessionService.getCurrentUser().value)
      this.formData.Company_Code = this.sessionService.getCurrentUser().value.CompanyCode;
      this.formData.User_Code = this.sessionService.getCurrentUser().value.UserId;
      this.formData.Action = "Get_Lab_Collection_Data"
      this.labCollectionService.labCollectionAll(this.formData).subscribe((res:any)=>{
        console.log("route by dock",res.result)
        this.LabcollectionList = res.result.Table
      })
    }
  
  }
