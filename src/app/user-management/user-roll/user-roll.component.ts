import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { data } from 'jquery';
import { Subject } from 'rxjs';
import { UserModel } from 'src/app/models/User.Model';
import { UserService } from 'src/app/services/user.service';
import { UserRollPopupComponent } from './user-roll-popup/user-roll-popup.component';

@Component({
  selector: 'app-user-roll',
  templateUrl: './user-roll.component.html',
  styleUrls: ['./user-roll.component.scss']
})
export class UserRollComponent implements OnInit {
  dtTrigger: Subject<any> = new Subject();
  page = 1;
  pageSize=5;
  btnTxt = "Save"
  filterRoleList:any[]=[];
  _filterRoletxt:string="";
  dtOptions:{} = {};
  constructor(private UserService:UserService,public dialog: MatDialog){

  }
  applyFilter(e:any){

  }
  UserRoleList:any[]=[];
  formdata = new UserModel();
  ngOnInit(): void {
    this.initialiseDatatable()
   this.getAllUserRole()
  }


  getAllUserRole(){
    this.UserRoleList=[];
    this.initialiseDatatable();
  this.formdata.calltype ="GridUserGroup"
  this.UserService.userManagementAll(this.formdata).subscribe((res:any)=>{
    console.log("user role",res)
    if(res.status==200){
      this.UserRoleList = res.result.Table;
      this.filterRoleList = this.UserRoleList
       this.dtTrigger.next(data);
    }
  })
  }

  openDialog(): void {
    this.dialog.open(UserRollPopupComponent, {
      width:'350px',
      height: '400px',
      data:{
        formData:this.formdata,
        btnTxt:this.btnTxt
      }
    }).afterClosed().subscribe(data=>{
     
      this.UserRoleList=[];
      this.getAllUserRole()
      this.reset()
     
    });
  }

  onEditUser(e:any){
    this.btnTxt= "Update";
    this.formdata = e;
    this.formdata.status=e.IsActive;
  this.openDialog()
  }

  reset(){
    this.btnTxt = "Save"
  this.formdata.USERTYPECODE = "",
  this.formdata.USERloginCODE = 0,
  this.formdata.UserGroupId = 0
  }


  initialiseDatatable(){
    this.dtOptions =  {
      pagingType: "full_numbers",
      scrollX:true,
      retrieve:true,
      autoWidth: false,
      
    }
  }


  get filterRoleName(){
    return this._filterRoletxt;
}

set filterRoleName(value:string){
  this._filterRoletxt = value;
  this.filterRoleList = this.fitermppByName(value)
}



fitermppByName(filterRoleterm:string){
 if(this.UserRoleList.length<0 || this.filterRoleName==""){
   return this.UserRoleList;
 }
 else{
   return this.UserRoleList.filter((data:any)=>{
     return (data.USERTYPECODE||data.USERTYPEDESC||data.bmccode).toLocaleLowerCase().includes(filterRoleterm)==filterRoleterm.includes(filterRoleterm.toLocaleLowerCase())
   })
 }
}

}
