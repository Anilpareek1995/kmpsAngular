import { getMultipleValuesInSingleSelectionError } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { data } from 'jquery';
import { Subject } from 'rxjs';
import { GeoGraphicModel } from 'src/app/models/DemoGraphic.Model';
import { login } from 'src/app/models/login.model';
import { UserModel } from 'src/app/models/User.Model';
import { UserService } from 'src/app/services/user.service';
import { UserPopupComponent } from './user-popup/user-popup.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit  {
  formdata = new UserModel();
  notLoading =true;
  dtTrigger: Subject<any> = new Subject();
  page=2;
  pageSize=5
  dtOptions:{} = {};
  UserList:any[]=[];
  filterUserList:any[]=[];
  _filterUsertxt:string="";
  constructor(private UserService:UserService,public dialog: MatDialog) {}
ngOnInit()
{
  
  this.getAllUser();
}

  getAllUser(){
    this.notLoading = false;
    this.UserList=[];
  this.formdata.calltype ="GridUserMaster"
  this.UserService.userManagementAll(this.formdata).subscribe((res:any)=>{    
    if(res.status==200){
      this.notLoading = true;
      this.UserList = res.result.Table;
      this.filterUserList = this.UserList;
      
    }
  })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
     }

  openDialog(): void {
    this.dialog.open(UserPopupComponent, {
      width:'100%',
      data:{
        formData:this.formdata
      }
    }).afterClosed().subscribe(data=>{
      this.UserList=[];
      this.getAllUser()
      this.reset()
     
    });
  }

  initialiseDatatable(){
    this.dtOptions =  {
      pagingType: "full_numbers",
      scrollX:true,
      retrieve:true,
      autoWidth: false,
      
    }
   
  }


  onEditUser(e:any){
    console.log("user data",e)
    this.formdata.UserId = e.Uid
    this.formdata.MccCode = e.mcccode
    this.formdata.BmcCode = e.bmccode
    this.formdata.PPCode = e.PPcode
    this.formdata.USERNAME = e.USERNAME;
    this.formdata.mobno = e.mobno;
    this.formdata.USERTYPECODE = e.USERTYPECODE;
    this.formdata.USERloginCODE = e.USERloginCODE;
    this.formdata.status=e.IsActive;
    
  this.openDialog()
  }

  get filterUserName(){
    return this._filterUsertxt;
}

set filterUserName(value:string){
  this._filterUsertxt = value;
  this.filterUserList = this.filterUserByName(value)
}



filterUserByName(filterUserterm:string){
 if(this.UserList.length<0 || this.filterUserName==""){
   return this.UserList;
 }
 else{
   return this.UserList.filter((data:any)=>{
     return (data.USERNAME||data.mobno||data.mcccode || data.bmccode).toLocaleLowerCase().includes(filterUserterm)==filterUserterm.includes(filterUserterm.toLocaleLowerCase())
   })
 }
}


  reset(){
    
    this.formdata.UserId = 0;
    this.formdata.USERNAME = "";
    this.formdata.USERPWD = "";
    this.formdata.MccCode = 0;
    this.formdata.BmcCode = 0;
    this.formdata.PPCode = 0;
    this.formdata.USERTYPECODE = "";
    this.formdata.USERloginCODE = 0;
  }
}



