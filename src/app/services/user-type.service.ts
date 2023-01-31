import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  API_Url = environment.API_Url
  constructor(private http:HttpClient) { }
  getPackageAll(){
    return this.http.post(this.API_Url + 'package/PackageAll', {})
    }
}
