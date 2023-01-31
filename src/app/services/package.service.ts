import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  API_Url = environment.API_Url
  constructor(private http:HttpClient) { }

  getPackageAll(){
    return this.http.post(this.API_Url + 'Packing/PackingAll', {})
    }

    getPackageForddl(){
      return this.http.post(this.API_Url + 'Packing/PackingForDdl', {})
      }

      addPackage(data:any){
        return this.http.post(this.API_Url + 'Packing/PackingAdd', data)
        }

        updatePackage(data:any){
          return this.http.post(this.API_Url + 'Packing/PackingUpdate', data)
          }

          deletePackage(data:any){
            return this.http.post(this.API_Url + 'Packing/PackingDelete', data)
            }

            PackageByPackageId(data:any){
              return this.http.post(this.API_Url + 'Packing/PackingByPackingId', data)
              }

    
}
