import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  API_Url = environment.API_Url
  constructor(private http:HttpClient) { }

  getAllRoute(data:any){
    return this.http.post(this.API_Url + 'Route/All', data)
    }
}
