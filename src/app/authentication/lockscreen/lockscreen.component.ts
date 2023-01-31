import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['./lockscreen.component.scss'],
})
export class LockscreenComponent implements OnInit {
  public form: UntypedFormGroup = Object.create(null);
  constructor(private fb: UntypedFormBuilder, private router: Router,
    private SessionService:SessionService) {}

  ngOnInit(): void {
    this.SessionService.logout();
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
    });
  }

  onSubmit(): void {
    this.router.navigate(['/']);
  }
}
