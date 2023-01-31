import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tokenPath } from '../models/site-map.Model';
import { SessionService } from './session.service';

@Injectable({ providedIn: 'root'})
export class AuthenticationService {
  APIURL: string = environment.API_Url + "Authentication/";
  APIUrl=environment.API_Url;
  currentUserSubject: any;
  constructor(private http: HttpClient,  private sessionService: SessionService) {
    if (localStorage.getItem(tokenPath)!=null) {
       //console.log("tiinsideken",localStorage.getItem(tokenPath));
      this.refreshToken();
     }
  }
  login(data: any) {
    return this.http.post(this.APIUrl +'Authentication/UserLogin',data).pipe(
      map((res: any) => {
        console.log("login service",res)
        if (res.status === 200) {
          this.setLogin(res.result);
        }
        return res;
      }));
  }

  refreshToken() {
   return this.http.post<any>(this.APIURL + "RefreshToken", {}).pipe(
    map((res: any) => {
      if (res.status === 200) {
        this.setLogin(res.result);
      }
      return res;
    }));

  }


 

  private setLogin(res: any) {
      this.sessionService.setCurrentUser(res.rslt);
      localStorage.setItem(tokenPath, res.token)
  }

  
  // getMenuSitemap() {
  //   return this.http.post<any>(this.APIURL + 'GetMenuSiteMap', {});
  // }

  UserRegistration(data:any) {
    return this.http.post<any>(this.APIURL + 'UserRegistration', data);
  }
}