import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeoGraphicModel } from 'src/app/models/DemoGraphic.Model';
import { UserModel } from 'src/app/models/User.Model';
import { RoleService } from 'src/app/services/role.service';
import { SharedService } from 'src/app/services/shared.service';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.scss']
})
export class UserPopupComponent implements OnInit {

  formData = new UserModel();
  statData = new GeoGraphicModel()
   public  StateList:any[]=[];
   public _filterStateList:any[]=[];
   public RoleList:any[]=[];
   public _filterRoleList:any[]=[];
   public MccList:any[]=[];
   public _filterMccList:any[]=[];
   public bmcList:any[]=[];
   public _filterBmcList:any[]=[];
   public mppList:any[]=[];
   public _filterMppList:any[]=[];
   
  public variables = ['One','Two','County', 'Three', 'Zebra', 'XiOn'];
    public filteredList1 = this.variables.slice();
    

    
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  public dialogRef: MatDialogRef<UserPopupComponent>,
  private stateService:StateService,
  private roleServise:RoleService,
  private UserService:UserService,
  private sharedService:SharedService){
    
  }


  ngOnInit(): void {
   
    this.getAllDropDown();
    this.GetAllRole();
    this.formData = this.data.formData
  }

  close(){
    this.dialogRef.close()
  }



  getAllDropDown(){
    this.formData.calltype = 'All_DropDown';
   this.UserService.userManagementAll(this.formData).subscribe((res:any)=>{
    if(res.status==200){
      console.log("all dopdowns",res)
     this.MccList =  res.result.Table;
     this.bmcList = res.result.Table1
     this.mppList = res.result.Table2
     this._filterMccList = this.MccList.slice();
     this._filterBmcList = this.bmcList.slice();
     this._filterMppList = this.mppList.slice();

     console.log("all mpps",res.result.Table2)
    
    }
   })
  }



  OnSaveUser(){
    if(this.formData.UserId>0){
      this.formData.calltype = "UpdateUser"
    }
    else{
      this.formData.calltype = "AddUser"
    }
    this.UserService.userManagementAll(this.formData).subscribe((res:any)=>{
      if(res.status==200){
        if(res.result.Table[0].is_successful==1){
          this.sharedService.openSnackBar(res.result.Table[0].message)
          this.dialogRef.close()
        }
        else{
          this.sharedService.openSnackBar(res.result.Table[0].message)
          this.dialogRef.close()
        }
        }
        else{
          this.sharedService.openSnackBar(res.message)
          this.dialogRef.close()
        }
       
      
    })
  }





  GetAllState(){
    this.statData.calltype = 'GetState';
   this.stateService.AllDemographic(this.statData).subscribe((res:any)=>{
    if(res.status==200){
     this.StateList =  res.result.Table;
     this._filterStateList = this.StateList.slice();
    
    }
   })
  }

  GetAllRole(){
    this.formData.calltype = 'ddl-usergroup';
   this.roleServise.GetRoleAll(this.formData).subscribe((res:any)=>{
    if(res.status==200){
     this.RoleList =  res.result.Table;
     this._filterRoleList = this.RoleList.slice();
    
    }
   })
  }

 
}
