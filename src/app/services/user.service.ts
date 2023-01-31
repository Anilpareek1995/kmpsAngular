import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_Url = environment.API_Url
  constructor(private http:HttpClient) { }

  userManagementAll(data:any){
    return this.http.post(this.API_Url + 'User/All', data)
    }

    UserAddUpdate(data:any){
      return this.http.post(this.API_Url + 'User/UserAddUpdate', data)
      }
}
