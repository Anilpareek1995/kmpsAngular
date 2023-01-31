import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  API_Url = environment.API_Url
  constructor(private http:HttpClient) { }

  getplantAll(data:any){
    return this.http.post(this.API_Url + 'Plant/All', data)
    }

  }
