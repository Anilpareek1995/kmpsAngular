import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompanyModel } from 'src/app/models/Company.Model';
import { CompanyService } from 'src/app/services/company.service';
import { SharedService } from 'src/app/services/shared.service';
import { CompanyPopupComponent } from './company-popup/company-popup.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  pageSize = 5;
  page = 1;
  btnTxt="";
  CompanyList:any[]=[];
  formdata = new CompanyModel();
  filterCompanyList: any[] = [];
  _filterCompanytxt: string = "";
  constructor(private companyService:CompanyService,public dialog: MatDialog,
    private SharedService:SharedService){

  }


  ngOnInit(): void {
    this._filterCompanytxt=""
   this.getAllCompany();
  }


  getAllCompany(){
  this.CompanyList=[];
  this.filterCompanyList=[];
  this.SharedService.openSppinerModel();
  this.formdata.action ="Get_All_Company"
  this.companyService.getCompanyAll(this.formdata).subscribe((res:any)=>{  
    console.log("res all company",res)  
    if(res.status==200){
      this.SharedService.closeSpinnerModel();
      this.CompanyList = res.result.Table;
      this.filterCompanyList = this.CompanyList
    }
  })
  }


  openDialog(): void {
    this.dialog.open(CompanyPopupComponent, {
      width:'100%',
      data:{
        formData:this.formdata,
        btnTxt:this.btnTxt
      }
    }).afterClosed().subscribe(data=>{
      this.reset()
      this.getAllCompany()
      
    });
  }


  reset(){
    this.btnTxt="Save";
    this.formdata.City = "";
    this.formdata.Company_Address = "";
    this.formdata.Company_Code = 0;
    this.formdata.Company_Name = "";
    this.formdata.Email_Id = "";
    this.formdata.Is_Active = 0;
    this.formdata.Mobile_No = "";
    this.formdata.Pincode = "";
    this.formdata.Short_Description = "";
    this.formdata.State_Code = 0;
    this.formdata.User_ID = 0;
  }

  onEditUser(e:any){
  this.btnTxt = "Update";
  this.formdata = e;
  this.formdata.Is_Active = e.status
  this.openDialog();
  }


  get filtercompanyName(){
    return this._filterCompanytxt;
}

set filtercompanyName(value:string){
  this._filterCompanytxt = value;
  this.filterCompanyList = this.filterCompanyByName(value)
}



filterCompanyByName(filterCompanyterm:string){
 if(this.CompanyList.length<0 || this.filtercompanyName==""){
   return this.CompanyList;
 }
 else{
   return this.CompanyList.filter((data:any)=>{
     return (data.Company_Name||data.Company_Address||data.Mobile_No || data.Company_Code).toLocaleLowerCase().includes(filterCompanyterm)==filterCompanyterm.includes(filterCompanyterm.toLocaleLowerCase())
   })
 }
}


}
