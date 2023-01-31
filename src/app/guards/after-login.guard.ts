import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router,
   private activatedRoute:ActivatedRoute) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,): boolean {
    if (this.sessionService.getCurrentUser().value.USERloginCODE!="") {
      console.log("return true",state.url)
      return true;
    }
    this.router.navigate(['/authentication/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
