import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  API_Url = environment.API_Url
  constructor(private http:HttpClient) { }


AllDemographic(data:any){
return this.http.post(this.API_Url + 'Demographic/AllDemographic', data)
}

StateForDdl(){
  return this.http.post(this.API_Url + 'State/StateForDdl', {})
  }


}
