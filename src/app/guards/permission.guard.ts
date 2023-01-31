import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(private readonly sessionService:SessionService,
    private readonly router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
     if( this.sessionService.checkPermission(route.data['entityId'])>0)
     {
       return true;
     }
     else{
       this.router.navigate(['/unAuthorized']);
       return false;
     }
  }
}
