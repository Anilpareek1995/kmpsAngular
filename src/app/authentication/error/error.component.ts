import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  navigateUrl="dashboards/dashboard1";
  constructor(private router: Router,
    private activatedRoute:ActivatedRoute) {}
  ngOnInit(): void {
    this.navigateUrl =this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || 'dashboards/dashboard1'
    this.router.navigateByUrl(this.navigateUrl);
  }
}
