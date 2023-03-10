import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DockCollectionService {

  API_Url = environment.API_Url
  constructor(private http:HttpClient) { }

  DockCollectionAll(data:any){
    return this.http.post(this.API_Url + 'DockCollection/All', data)
    }
}
