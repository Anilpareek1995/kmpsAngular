import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BmcModel } from 'src/app/models/BmcModel';
import { BmcService } from 'src/app/services/bmc.service';
import { MccService } from 'src/app/services/mcc.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { MemberPopupComponent } from './member-popup/member-popup.component';
import * as XLSX from 'xlsx';
import { MemberFilterPopupComponent } from './member-filter-popup/member-filter-popup.component';
import { MppService } from 'src/app/services/mpp.service';
import { MppModel } from 'src/app/models/MppModel';
import { MemberService } from 'src/app/services/member.service';
import { MemberModel } from 'src/app/models/MemberModel';
import { date } from 'ngx-custom-validators/src/app/date/validator';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  @ViewChild('excelUpload') inputName: any;
  isExcel:boolean= false;
  pageSize = 5;
  page = 1;
  btnTxt="Save";
  SelectedmppCode="";
  BmcList:any[]=[];
  BmcData = new BmcModel();
  MppModel = new MppModel();
  formData = new MemberModel()
  filterBmcList: any[] = [];
  _filterMpptxt: string = "";
  MppList: any[] = [];
  filterMppList: any[] = [];
  ExcelMemberList: any[] = [];
  filterExcelMppList: any[] = [];
  UploadExcelMemberList: any[] = [];
  Excelkeys:any[]=[];
  MemberList:any[]=[];
  KeyMemberList:any[]=[];
  filterMemberList:any[]=[];
  constructor(private mccService:MccService,public dialog: MatDialog,
    private SharedService:SharedService,
    private SessionService:SessionService,
    private BmcService:BmcService,
    private mppService:MppService,
    private memberService:MemberService){
  }


  ngOnInit(): void {
    // this.getAllmember();
  //   this.getBmcAll();
  //  this.getMppAll();
    this.openfiltermemberSelectDialog();
  }


  getBmcAll(){
  this.BmcList=[];
  this.filterBmcList=[];
  this.SharedService.openSppinerModel();
  this.BmcData.Comapny_Code =this.SessionService.getCurrentUser().value.CompanyCode;
  this.BmcData.Action ="Get_All_Center"
  this.BmcService.getBmcAll(this.BmcData).subscribe((res:any)=>{  
    if(res.status==200 && res.result.Table1.length>0){
      console.log("Bmc list",res)
      this.SharedService.closeSpinnerModel();
      this.BmcList = res.result.Table;
      this.filterBmcList = this.BmcList;
    }
    else{
      this.SharedService.closeSpinnerModel();
      this.SharedService.openSnackBar("No Data found");
    }
  })
  }

  getAllmember(mppIds:any){
   
    this.MemberList=[];
    this.filterMemberList=[];
    this.SharedService.openSppinerModel();
    this.formData.Company_Code =this.SessionService.getCurrentUser().value.CompanyCode;
    this.formData.Action ="Get_Data_Onload"
    this.memberService.getMemberAll(this.formData).subscribe((res:any)=>{  
      if(res.status==200){
        this.SharedService.closeSpinnerModel();
        var listMember = res.result.Table;
        this.MemberList = listMember.filter((item:any) => {
          return mppIds.some((data:any) =>item.Society_Code == data
           );
      });
        this.KeyMemberList = Object.keys(listMember[0])
        this.filterMemberList = this.MemberList.slice();                                                                                                                                                                  
      }
      else{
        this.SharedService.closeSpinnerModel();
        this.SharedService.openSnackBar("No Data found");
      }
    })
    }

    getMppAll(data:any){
      this.MemberList=[];
      this.filterMemberList=[];
      this.SharedService.openSppinerModel();
      this.formData.Center_Code = data
      this.formData.Company_Code =this.SessionService.getCurrentUser().value.CompanyCode;
      this.formData.Action ="Get_All_Societies"
      this.mppService.getMppAll(this.formData).subscribe((res:any)=>{  
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
  


  openDialog(): void {
    var SelectedmppCode = 0
    this.dialog.open(MemberPopupComponent, {
      width:'100%',
      data:{
        formData:this.formData,
        btnTxt:this.btnTxt,
        SelectedmppCode:SelectedmppCode
      }
    }).afterClosed().subscribe((data:any)=>{
      this.getAllmember(this.SelectedmppCode);
      this.reset();
      
      
    });
  }

  openfiltermemberSelectDialog(): void {
    this.dialog.open(MemberFilterPopupComponent, {
      maxWidth:'600px',
      minWidth:'200px',
      maxHeight:'400px',
      data:{
        formData:this.formData,
        btnTxt:this.btnTxt
      }
    }).afterClosed().subscribe((data:any)=>{
      if(data!=undefined){
        this.SelectedmppCode = data;
        this.getAllmember(this.SelectedmppCode);
      }
      this.reset();
    });
  }


  onUploadexcel(){
    this.isExcel = true
  }

  onCloseExcel(){
    this.isExcel = false
  }



  onFileChange(evt: any) {
   

    this.ExcelMemberList = [];
    this.Excelkeys = [];
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
  
      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
  
      /* save data */
      this.ExcelMemberList = XLSX.utils.sheet_to_json(ws, { header: 0 });
      this.Excelkeys = Object.keys(this.ExcelMemberList[0]);
      console.log("upoad member list",this.ExcelMemberList)
        this.UploadExcel(this.ExcelMemberList);
  
      
    };
    reader.readAsBinaryString(target.files[0]);
  }
  
  
  UploadExcel(data:any[]){
   
    for(let i = 0; i<data.length; i++){
      const element = data[i];
      this.UploadExcelMemberList.push({
        FarmerCode :element.MemberCode,
          FirstName :element.MemberName,
          FatherName :element.FatherName,
          Gender :element.Gender,
         CenterCode :element.BMCCode,
         SocietyCode :element.PPCode         ,
         StateId :element.StateCode,
         DistrictId :element.DistCode,
         SubDistrictId :element.TahsilCode,
         VillageId:element.VillageCode,
         HamletId:element.HamletCode,
          FormNumber :element.FORMNumber,
          IsActive :element.IsActive, 
          PhoneNumber :element.MobileNo,
          ExpieryDate :new Date().getDate(),
          ExpieryShift :'E',
      });
    }

    console.log("memer excel upload",this.UploadExcelMemberList)

    
  }


  onSaveUploadedMember(){
   this.formData.FarmerUpload = this.UploadExcelMemberList;
    // this.formData.Company_Code =this.SessionService.getCurrentUser().value.CompanyCode;
    // this.formData.User_Id =this.SessionService.getCurrentUser().value.UserId;
       this.formData.Action = "Import_Farmer"
     this.memberService.UploadMember(this.formData).subscribe((res:any)=>{
       if(res.status==200){
        console.log("uploaded member",res);
         if(res.result.Table[0].is_successful==1){
           this.SharedService.openSnackBar(res.result.Table[0].message)
         }
         else{
           this.SharedService.openSnackBar(res.result.Table[0].message)
         }
         }
         else{
           this.SharedService.openSnackBar(res.message)
           
         }
        
       
     })
   }
  
  
  
  
  resetExcel(){
    this.inputName.nativeElement.value = '';
    this.ExcelMemberList = [];
    this.Excelkeys = [];
        
  }


  reset(){
    this.btnTxt="Save";  
     
   this.formData.Action  = "";
   this.formData.Company_Code  = 0;
   this.formData.Society_Code  = 0;
   this.formData.Farmer_Id  = 0;
   this.formData.First_Name  = "";
   this.formData.Last_Name  = "";
   this.formData.Middle_Name  = "";
   this.formData.Gender= "";
   this.formData.Birth_Date = new Date();
   this.formData.Caste = "";
   this.formData.MCC_Id  = 0;
   this.formData.Plant_Id  = 0;
   this.formData.Address_Line1  = "";
   this.formData.Address_Line2  = "";
   this.formData.City  = "";
   this.formData.Pincode  = "";
   this.formData.Hamlet_Id  = 0;
   this.formData.Village_Id  = 0;
   this.formData.Sub_District_Id  = 0;
   this.formData.District_Id  = 0;
   this.formData.State_Id  = 0;
   this.formData.Country_Id  =  0;
   this.formData.Email_Address  = "";
   this.formData.Phone_Number  = "";
   this.formData.Farmer_Code  = "";
   this.formData.Other_Code  = "";
   this.formData.    Bank_Code  = 0;
   this.formData.Bank_Branch_Name  = "";
   this.formData.Account_Name  = "";
   this.formData.Ifsc_Code  = "";
   this.formData.Account_Number  = "";
   this.formData.Pan_Number  = "";
   this.formData.Beneficiary_Name  = "";
   this.formData.Adhar_Number  = "";
   this.formData.User_Id  = 0;
   this.formData.Is_Active  = 0;
   this.formData.Expiry_Date  =new Date();
   this.formData.Expiry_Shift  =new Date();
   this.formData.Center_Code  = 0;
   this.formData.Route_Code  = 0;
   this.formData.Form_Number  = "";
   this.formData.Father_Name  = "";
   this.formData.Qualification  = "";
   this.formData.Post_Office  = "";
   this.formData.Cow_HeriferNo  = 0;
   this.formData.Buffalo_HeriferNo  = 0;
   this.formData.Mix_HeriferNo  = 0;
   this.formData.DesiCow_HeriferNo  = 0;
   this.formData.Crossbred_HeriferNo  = 0;
   this.formData.Cow_DryNo  = 0;
   this.formData.Buffalo_DryNo  = 0;
   this.formData.Mix_DryNo  = 0;
   this.formData.DesiCow_DryNo  = 0;
   this.formData.Crossbred_DryNo  = 0;
   this.formData.Cow_AnimalNos  = 0;
   this.formData.Buffalo_AnimalNos  = 0;
   this.formData.Mix_AnimalNos  = 0;
   this.formData.DesiCow_AnimalNos  = 0;
   this.formData.Crossbred_Animal_Nos  = 0;
   this.formData.Lpd_No  = 0;
   this.formData.Household_Consumption  = 0;
   this.formData.Market_Consumption  = 0;
   this.formData.Particluar1_Name  = "";
   this.formData.Particluar1_Gender  = "";
   this.formData.Particluar1_Age  = 0;
   this.formData.Particluar1_Relation  = "";
   this.formData.Nominee_Name  = "";
   this.formData.Relation  = "";
   this.formData.Nominee_Address  = "";
   this.formData.Guardian_Name  = "";
   this.formData.Member_Family_Age  = 0;
   this.formData.Admission_Fee  = 0;
   this.formData.Share_Qty  = 0;
   this.formData.Paid_Amount  = 0;
   this.formData.Depositor_Bank_Name  = "";
   this.formData.Depositor_Branch_Name  = "";
   this.formData.DD_No  = "";
   this.formData.Transaction_Date = new Date();
   this.formData.Payment_Mode  = "";
   this.formData.Wef_Date = new Date();
   this.formData.Unique_Member_Code  = "";
   this.formData.Member_Type  = "";
   this.formData.Approval_Status  = "";
   this.formData.Accepted_By  = "";
   this.formData.Approval_Date  = new Date();
   this.formData.Age  = 0;
   this.formData.IMEI_No  = "";
   this.formData.SIM_No  = "";
   this.formData.Mastercode  = "";
   this.formData.defaultMilkType  = "";
  }

  onEditUser(e:any){
    console.log("edit member",e)
    this.btnTxt = "Update";
    this.formData = e
// this.formData.Center_Code = e.bmcId
// this.formData.Expiry_Date = e.expiryDate
// this.formData.Farmer_Code = e.farmerCode
// this.formData.Farmer_Id = e.farmerId
// this.formData.First_Name = e.farmerName
// this.formData.Gender = e.gender
// this.formData.Is_Active = e.isActive
// this.formData.MCC_Id = e.mccId
// this.formData.Other_Code = e.otherCode
// this.formData.Phone_Number = e.phoneNumber
// this.formData.Plant_Id = e.plantId
// this.formData.Route_Code = e.routeId
// this.formData.Society_Code = e.societyId

 
  this.openDialog();
  }


  get filterMppName(){
    return this._filterMpptxt;
}

set filterMppName(value:string){
  this._filterMpptxt = value;
  this.filterMppList = this.filterMppByName(value)
}



filterMppByName(filterMppterm:string){
 if(this.MppList.length<0 || this.filterMppName==""){
   return this.MppList;
 }
 else{
   return this.MppList.filter((data:any)=>{
     return (data.Society_Name).toLocaleLowerCase().includes(filterMppterm)==filterMppterm.includes(filterMppterm.toLocaleLowerCase())
   })
 }
}


}