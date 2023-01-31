import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  API_Url = environment.API_Url
  constructor(private http:HttpClient) { }

  getCompanyAll(data:any){
    return this.http.post(this.API_Url + 'Company/All', data)
    }
}
