import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MemberModel } from 'src/app/models/MemberModel';
import { MemberTransactionModel } from 'src/app/models/MemberTransactionModel';
import { MemberTransactionService } from 'src/app/services/member-transaction.service';
import { MemberService } from 'src/app/services/member.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-member-add-trans-popup',
  templateUrl: './member-add-trans-popup.component.html',
  styleUrls: ['./member-add-trans-popup.component.scss']
})
export class MemberAddTransPopupComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  public dialogRef: MatDialogRef<MemberAddTransPopupComponent>,
  private memberService:MemberService ,
  private SessionService:SessionService,
   private SharedService:SharedService,
   private MemberTransactionService:MemberTransactionService
)
  {    }
  MemberList:any[]=[];
  filterMemberList:any[]=[];
  formData = new MemberTransactionModel();
  MemberData = new MemberModel();
   
  filterData = {
    Society_Code:0,
    Route_Code:0,
    Center_Code:0,
    MCC_Id:0,
    Plant_Id:0,
    shift:"",
    Dump_Date:new Date().toDateString(),
    Action:"",
    Company_Code:0,
    Mpp_Name:"",
    Mcc_Name:"",
    Route_Name:"",
    Plant_Name:"",
    Bmc_Name:""
  }
 
  ngOnInit(): void {
    this.getAllmember();
    console.log("this.data.filterData",this.data.filterData);
    this.filterData  = this.data.formData
  }

  getAllmember(){
    this.MemberList=[];
    this.filterMemberList=[];
    this.MemberData.Company_Code =this.SessionService.getCurrentUser().value.CompanyCode;
    this.MemberData.Action ="Get_Data_Onload"
    this.memberService.getMemberAll(this.MemberData).subscribe((res:any)=>{  
      if(res.status==200){
        console.log("member list",res.result.Table);
        this.MemberList = res.result.Table;
        this.filterMemberList = this.MemberList.slice();
        
      
                                                                                                                                                                          
      }
      else{
        this.SharedService.openSnackBar("No Data found");
      }
    })
    }

    SaveMemberTransaction(){
      this.formData.Action ='Farmer_Collection_Manual';
      this.formData.Company_Code = this.SessionService.getCurrentUser().value.CompanyCode;
      this.formData.Center_Code = this.filterData.Center_Code;
      this.formData.Route_Id = this.filterData.Route_Code;
      this.formData.Society_Code = this.filterData.Society_Code
      this.formData.Dump_Date = '22/02/2023'
      this.formData.Weightliter = 10;
     this.MemberTransactionService.MemberTransactionAll(this.formData).subscribe((res:any)=>{
      if(res.status==200){
        this.SharedService.openSnackBar(res.result.Table[0].message);
        this.close();
      }
      else{
        this.SharedService.openSnackBar(res.result.Table[0].message);
        this.close();
      }
     })
    }

    close(){
      this.dialogRef.close();
    }

}
