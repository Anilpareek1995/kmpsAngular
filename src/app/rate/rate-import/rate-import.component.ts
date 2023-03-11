import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Rate_Detail } from 'src/app/models/Rate_Detail.model';
import { RateDetailService } from 'src/app/services/rate-detail.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { CreateRateComponent } from '../create-rate/create-rate.component';
import { RateModule } from '../rate.module';
import { RateImportPopupComponent } from './rate-import-popup/rate-import-popup.component';

@Component({
  selector: 'app-rate-import',
  templateUrl: './rate-import.component.html',
  styleUrls: ['./rate-import.component.scss']
})
export class RateImportComponent implements OnInit {
  RateDetailList:any[]=[];
formData=new Rate_Detail();
pageSize = 5;
  page = 1;
  btnTxt="Save";
constructor(private ratedetailservice:RateDetailService,
  private sharedservice:SharedService,private sessionservice:SessionService,
  public dialog: MatDialog){

}
  ngOnInit(): void {
    this.getratedetailsl();
  }

  getratedetailsl(){
this.formData.Company_Code=this.sessionservice.getCurrentUser().value.CompanyCode
this.formData.Action="Load_Grid_Data"
    this.ratedetailservice.getRateAll(this.formData).subscribe((res:any)=>{
      if(res.status==200){
        this.RateDetailList=res.result.Table;
        console.log(this.RateDetailList)
      }
      else{
        this.sharedservice.openSnackBar(res.result.Table[0].message)
      }
    })
  }

  onEditUser(data:any){
    this.dialog.open(CreateRateComponent, {
       width:'80%',
      data:{
        formData:data,
        btnTxt:this.btnTxt
      }
    }).afterClosed().subscribe((data:any)=>{
      console.log("plant data after pop cloce")
      this.getratedetailsl()
      this.reset();
      
    });
  }

  openDialog(): void {
    this.dialog.open(RateImportPopupComponent, {
      // width:'100%',
      data:{
        formData:this.formData,
        btnTxt:this.btnTxt
      }
    }).afterClosed().subscribe((data:any)=>{
      console.log("plant data after pop cloce")
      this.getratedetailsl()
      this.reset();
      
    });
  }

  reset(){
    //this.formData={};
  }
}


