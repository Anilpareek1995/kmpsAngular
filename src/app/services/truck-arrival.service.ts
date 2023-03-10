import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TruckArrivalService {

  API_Url = environment.API_Url
  constructor(private http:HttpClient) { }

  TruckArrivalAll(data:any){
    return this.http.post(this.API_Url + 'TruckArrival/All', data)
    }
}
