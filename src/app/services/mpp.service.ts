import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MppService {

  API_Url = environment.API_Url
  constructor(private http:HttpClient) { }
  getMppAll(data:any){
    return this.http.post(this.API_Url + 'Mpp/All', data)
    }

    Uploadmpp(data:any){
      return this.http.post(this.API_Url + 'Mpp/Uploadmpp', data)
      }

    
}
