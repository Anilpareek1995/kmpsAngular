import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  API_Url = environment.API_Url
  constructor(private http:HttpClient) { }


getPartyAll(){
return this.http.post(this.API_Url + 'Party/PartyAll', {})
}
}
