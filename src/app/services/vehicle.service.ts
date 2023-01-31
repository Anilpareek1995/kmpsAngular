import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  API_Url = environment.API_Url
  constructor(private http:HttpClient) { }


  VehicleAll(){
    return this.http.post(this.API_Url + 'Vehicle/VehicleAll', {})
    }

  VehicleForDdl(){
return this.http.post(this.API_Url + 'Vehicle/VehicleForDdl', {})
}

VehicleAdd(data:any){
  return this.http.post(this.API_Url + 'Vehicle/VehicleAdd', data)
}

  VehicleUpdate(data:any){
    return this.http.post(this.API_Url + 'Vehicle/VehicleUpdate', data)
  }

  VehicleDelete(data:any){
      return this.http.post(this.API_Url + 'Vehicle/VehicleDelete', data)
  }
      VehicleByVehicleId(data:any){
        return this.http.post(this.API_Url + 'Vehicle/VehicleByVehicleId', data)
}
}


