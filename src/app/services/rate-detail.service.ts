import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RateDetailService {

  API_Url = environment.API_Url
  constructor(private http:HttpClient) { }

  getRateAll(data:any){
    return this.http.post(this.API_Url + 'RateDetail/All', data)
    }

   ExportRateAll(data:any){
      return this.http.post(this.API_Url + 'RateDetail/ZipRate', data)
      }

    
}
