import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  API_Url = environment.API_Url
  constructor(private http:HttpClient) { }
  getMemberAll(data:any){
    return this.http.post(this.API_Url + 'member/All', data)
    }

    UploadMember(data:any){
      return this.http.post(this.API_Url + 'member/UploadMember', data)
      }
}
