import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormControl } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { SharedService } from 'src/app/services/shared.service';

const password = new UntypedFormControl('', Validators.required);
const confirmPassword = new UntypedFormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public form: UntypedFormGroup = Object.create(null);
  constructor(private fb: UntypedFormBuilder, private router: Router,
    private Authservice:AuthenticationService,private sharedService: SharedService) {}

  ngOnInit(): void {
    this.form = this.fb.group({

      email: [null, Validators.compose([Validators.required, CustomValidators.email])],
      UserName: "",
      CompanyName:"",
      GSTNo:"",
      taxSlab:0,
      emailOtp:"",
      mobileNo: "",
      // tslint:disable-next-line - Disables all
      password: password,
      // tslint:disable-next-line - Disables all
      confirmPassword: confirmPassword,
    });
   
  }

  onSubmit(): void {
   var request = {EmailId:this.form.value.email,UserPassword:this.form.value.password,
      UserName:this.form.value.UserName,CompanyName:this.form.value.CompanyName,
      TaxRate:this.form.value.taxSlab,GSTIN:this.form.value.GSTNo,MobileNo:this.form.value.mobileNo}
    this.Authservice.UserRegistration(request).subscribe((res:any)=>{
      console.log("user resister",res)
      if(res.Success && res.Status==200){
        this.sharedService.openSnackBar("Done");
        
        this.router.navigate(['/']);
      }
      else{
        this.sharedService.openSnackBar("Error");
        
      }
    })
    
  }
}
