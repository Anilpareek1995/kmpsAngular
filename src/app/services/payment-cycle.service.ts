import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentCycleService {

  API_Url = environment.API_Url
  constructor(private http:HttpClient) { }

  PaymentCycleAll(data:any){
    return this.http.post(this.API_Url + 'PaymentCycle/All', data)
    }
}
