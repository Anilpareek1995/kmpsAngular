import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  navigateUrl = "";
  loader:Boolean= false;
  public form: UntypedFormGroup = Object.create(null);
  constructor(private fb: UntypedFormBuilder, private router: Router,
    private AuthService: AuthenticationService,
    public sessionService: SessionService,
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
     this.checkToken();
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
    });
  }

  onSubmit(): void {
    this.sharedService.openSppinerModel();
    this.AuthService.login({ USERloginCODE: this.form.value.email, USERPWD: this.form.value.password })
      .subscribe(res => {
        if (res.status == 200) {

          console.log("login res",res);
        this.sharedService.closeSpinnerModel();
          this.sharedService.openSnackBar("Login Succesfuly!!")
          this.router.navigate([this.navigateUrl]);
        }
        else {
          this.sharedService.openSnackBar("Invalid Login Credentials");
          this.sessionService.logout();
        }
      }
      );
  }


  checkToken(){
    this.navigateUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || '/dashboard'
  this.loader = this.sharedService.openSppinerModel();
    this.AuthService.refreshToken().subscribe((res: any) => {
      console.log("res",res)
      if (res.status == 200){
        this.sessionService.getCurrentUser().subscribe(res => {
          if (res.UserId>0 && res.USERloginCODE != "") {
            this.loader= this.sharedService.closeSpinnerModel();
            this.router.navigateByUrl(this.navigateUrl);
          }
          else{
            this.loader=this.sharedService.closeSpinnerModel();
          }
        });
        
      }
    else{
      this.loader=  this.sharedService.closeSpinnerModel();
    }
  });
   



   
    
  }

}
