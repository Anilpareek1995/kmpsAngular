import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BmcModel } from 'src/app/models/BmcModel';
import { MppModel } from 'src/app/models/MppModel';
import { BmcService } from 'src/app/services/bmc.service';
import { MccService } from 'src/app/services/mcc.service';
import { MppService } from 'src/app/services/mpp.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { MppPopupComponent } from './mpp-popup/mpp-popup.component';
import { SelectBmcForMppComponent } from './select-bmc-for-mpp/select-bmc-for-mpp.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-mpp',
  templateUrl: './mpp.component.html',
  styleUrls: ['./mpp.component.scss']
})
export class MppComponent implements OnInit {
  @ViewChild('excelUpload') inputName: any;
  isExcel:boolean= false;
  pageSize = 5;
  page = 1;
  btnTxt="Save";
  SelectedBmcCode="";
  BmcList:any[]=[];
  BmcData = new BmcModel();
  formData = new MppModel();
  filterBmcList: any[] = [];
  _filterMpptxt: string = "";
  MppList: any[] = [];
  filterMppList: any[] = [];
  ExcelMppList: any[] = [];
  filterExcelMppList: any[] = [];
  UploadExcelMppList: any[] = [];
  Excelkeys:any[]=[];
  constructor(private mccService:MccService,public dialog: MatDialog,
    private SharedService:SharedService,
    private SessionService:SessionService,
    private BmcService:BmcService,
    private mppService:MppService){
  }


  ngOnInit(): void {
    this.openBmcSelectDialog();
  //   this.getBmcAll();
  //  this.getMppAll();
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

  getMppAll(data:any){
    this.MppList=[];
    this.filterMppList=[];
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
    this.dialog.open(MppPopupComponent, {
      width:'100%',
      data:{
        formData:this.formData,
        btnTxt:this.btnTxt,
        SelectedBmcCode:this.SelectedBmcCode
      }
    }).afterClosed().subscribe((data:any)=>{
      this.getMppAll(this.SelectedBmcCode);
      this.reset();
      
      
    });
  }

  openBmcSelectDialog(): void {
    this.dialog.open(SelectBmcForMppComponent, {
      maxWidth:'600px',
      minWidth:'200px',
      maxHeight:'400px',
      data:{
        formData:this.formData,
        btnTxt:this.btnTxt
      }
    }).afterClosed().subscribe((data:any)=>{
      console.log("bmc selected code",data)
      if(data!=undefined){
        this.SelectedBmcCode = data;
        this.getMppAll(this.SelectedBmcCode)
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
    this.ExcelMppList = [];
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
      this.ExcelMppList = XLSX.utils.sheet_to_json(ws, { header: 0 });
      this.Excelkeys = Object.keys(this.ExcelMppList[0]);
        this.UploadExcel(this.ExcelMppList);
  
      
    };
    reader.readAsBinaryString(target.files[0]);
  }
  
  
  UploadExcel(data:any[]){
    for(let i = 0; i<data.length; i++){
      const element = data[i];
      this.UploadExcelMppList.push({
        MPPCode:element.MPPCode,
        MPPName : element.MPPName,
        RouteCode : element.RouteCode,
        CenterCode : element.CenterCode,
        MobileNo  : element.MobileNo,
        DistrictCode : element.DistrictCode,
        SubDistrictCode : element.SubDistrictCode,
        VillageId : element.VillageId,
        HamletId : element.HamletId,
        BankCode  : element.BankCode,
        AccountNumber : element.AccountNumber,
        ContactPerson : element.ContactPerson,
        ContactNo : element.ContactNo,
        PanNo : element.PanNo,
        SecurityAmount : element.SecurityAmount,
        PaymentMode : element.PaymentMode,
        ReferenceNo : element.ReferenceNo,
        AggrementNo : element.AggrementNo,
        AggerementExpiryDate : element.AggerementExpiryDate,
        SecurityChequeNo_1LakhRs  : element.SecurityChequeNo_1LakhRs,
        SecurityChequeNo_100Rs : element.SecurityChequeNo_100Rs,
        SapRtCode : element.SapRtCode,
        SadaCan: element.SadaCan,
        InstalltionDate : element.InstalltionDate,
        StartDate  : element.StartDate,
        EndDate : element.EndDate,
        AdharNo : element.AdharNo,
        AgentName : element.AgentName,
        SapPlantCode : element.SapPlantCode,
        BankBranchName : element.BankBranchName,
        IFSC  : element.IFSC,
        AccountName  : element.AccountName,
        ExCodeofTahsilCode : element.ExCodeofTahsilCode,
        EffectiveDate : element.ExCodeofTahsilCode,
        IsActive : element.IsActive,
        EffectiveShift : element.EffectiveDate,
       
      });
    }

    console.log("this.excel data",this.UploadExcelMppList)
   
  }


  onSaveUploadedMpp(){
   this.formData.Mpp_BO_SP = this.UploadExcelMppList;
    this.formData.Company_Code =this.SessionService.getCurrentUser().value.CompanyCode;
    this.formData.User_Code =this.SessionService.getCurrentUser().value.UserId;
       this.formData.Action = "Import_MPP"
     this.mppService.Uploadmpp(this.formData).subscribe((res:any)=>{
       if(res.status==200){
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
    this.ExcelMppList = [];
    this.Excelkeys = [];
        
  }


  reset(){
    this.btnTxt="Save";   
         this.formData.Society_Code = 0; 
         this.formData.Society_Name = ""; 
         this.formData.Sap_Code = ""; 
         this.formData.Company_Code = 0; 
         this.formData.Route_Code = 0; 
         this.formData.Sap_Route_Code = ""; 
         this.formData.Taluka_Code = 0; 
         this.formData.Sada_Can = ""; 
         this.formData.Center_Code = ""; 
         this.formData.Mobile_No = ""; 
         this.formData.Bank_Code = 0; 
         this.formData.Account_No = ""; 
         this.formData.Adhar_No = ""; 
         this.formData.Agent_Name = ""; 
         this.formData.SAP_Plant_Code = 0; 
         this.formData.User_Code = 0; 
         this.formData.Action = "";
         this.formData.json_object = "";
         this.formData.Is_Company_User = 0;
         this.formData.Country_Id = 0; 
         this.formData.State_Code = 0; 
         this.formData.District_Id = 0; 
         this.formData.Sub_District_Id = 0; 
         this.formData.Village_Id = 0; 
         this.formData.Hamlet_Id = 0; 
         this.formData.Contact_Person = "";
         this.formData.Contact_No = "";
         this.formData.Pan_No = "";
         this.formData.Security_Amount = 0;
         this.formData.Payment_Mode = "";
         this.formData.Reference_No = "";
         this.formData.Aggrement_No = "";
         this.formData.Aggerement_Expiry_Date = "";
         this.formData.Security_ChequeNo_1LakhRs = "";
         this.formData.Security_ChequeNo_100Rs = "";
         this.formData.SIM_No = "";
         this.formData.IMEI_No = "";
         this.formData.Other_Code = "";
         this.formData.IFSC_Code = "";
         this.formData.Effective_date =new Date();
         this.formData.IsActive = 0;
         this.formData.Transfer_Society_Code = 0; 
         this.formData.Effective_Shift = "";
  }

  onEditUser(e:any){
  this.btnTxt = "Update";
  this.formData = e;
  this.formData.IsActive = e.IsActive
  this.formData.Other_Code = e.Society_other_Code;
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