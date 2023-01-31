import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { defaultUser, sitemap, tokenPath } from '../models/site-map.Model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
 public notLoading:boolean= true;
  public currentUser:BehaviorSubject<any> = new BehaviorSubject(defaultUser);
  constructor(private router:Router) { 
  }
 
  public checkPermission(siteMap: sitemap) {
    if (this.currentUser.value.RoleId == 2) {
      return 4;
    }
    var rslt = this.currentUser.value.Permission.find((d: any) => d.EntityId == siteMap)
    if (rslt) {
      return rslt.Permission;
    }
    return 0;

  }

  setCurrentUser(data:any)
  {
      this.currentUser.next(data);
      // if(data.Menu)
      // {
      //   this.userMenu.next(data.Menu);
      // }
  }

  getCurrentUser():BehaviorSubject<any>
  {
    return this.currentUser;
  }

  // getMenu()
  // {
  //   return this.userMenu;
  // }
  
  logout() {
    this.notLoading = true;
    localStorage.removeItem(tokenPath);
    this.currentUser.next(defaultUser);
    this.router.navigate(['/authentication/login']);
  }
}
