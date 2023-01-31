import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  API_Url = environment.API_Url
  constructor(private http:HttpClient) { }


getPartyAll(){
return this.http.post(this.API_Url + 'Party/PartyAll', {})
}

PartyForDdl(){
  return this.http.post(this.API_Url + 'Party/PartyForDdl', {})
  }

  PartyAdd(data:any){
    return this.http.post(this.API_Url + 'Party/PartyAdd', data)
    }

    PartyUpdate(data:any){
      return this.http.post(this.API_Url + 'Party/PartyUpdate', data)
      }
       
      partyDelete(data:any){
        return this.http.post(this.API_Url + 'Party/PartyDelete', data)
        }



}
