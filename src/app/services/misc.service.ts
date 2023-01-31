import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  API_Url = environment.API_Url
  constructor(private http:HttpClient) { }

  getGrType(){
    return this.http.post(this.API_Url + 'Misc/GRTypeDdl', {})
    }

    FreightPaidBy(){
      return this.http.post(this.API_Url + 'Misc/FreightPaidBy', {})
      }

      AdvanceBy(){
        return this.http.post(this.API_Url + 'Misc/AdvanceBy', {})
        }

        DueTo(){
          return this.http.post(this.API_Url + 'Misc/DueTo', {})
          }

          TaxPaidBy(){
            return this.http.post(this.API_Url + 'Misc/TaxPaidBy', {})
            }

   
}
