import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FreightMemoService {

  API_Url = environment.API_Url
  constructor(private http:HttpClient) { }

  AddUpdate(data:any){
    return this.http.post(this.API_Url + 'FreightMemo/AddUpdate', data)
    }

    Delete(data:any){
      return this.http.post(this.API_Url + 'FreightMemo/Delete?FMId='+data,{})
      }

      GetFMByFMId(data:any){
        return this.http.post(this.API_Url + 'FreightMemo/GetFMByFMId?FMId='+data,{})
        }

        GetFMIdByFMNo(data:any){
          return this.http.post(this.API_Url + 'FreightMemo/GetFMIdByFMNo?FMNo='+data,{})
          }

          GetVehicleForFM(){
            return this.http.post(this.API_Url + 'FreightMemo/GetVehicleForFM', {})
            }

            GetGRForFMByVehicleId(data:any){
              return this.http.post(this.API_Url + 'FreightMemo/GetGRForFMByVehicleId?VehicleId='+data,{})
              }
              FreightMemoAll(){
                return this.http.post(this.API_Url + 'FreightMemo/All', {})
                }


}

