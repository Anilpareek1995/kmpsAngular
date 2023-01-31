import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserModel } from 'src/app/models/User.Model';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-roll-popup',
  templateUrl: './user-roll-popup.component.html',
  styleUrls: ['./user-roll-popup.component.scss']
})
export class UserRollPopupComponent implements OnInit {
 formData = new UserModel();
 btnTxt = "";
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  public dialogRef: MatDialogRef<UserRollPopupComponent>,
  private UserService:UserService,
  private sharedService:SharedService){
  }
  ngOnInit(): void {
    this.formData = this.data.formData;
    this.btnTxt = this.data.btnTxt;
  }

  close(){
    this.dialogRef.close();
  }

  
  OnSaveUserRole(){
    if(this.formData.UserGroupId>0){
      this.formData.calltype = "UpdateUserGroup"
    }
    else{
      this.formData.calltype = "AddUserGroup"
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
}
