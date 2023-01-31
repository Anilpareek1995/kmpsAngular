import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  API_Url = environment.API_Url
  constructor(private http:HttpClient) { }

  stationAll(){
    return this.http.post(this.API_Url + 'Station/StationAll', {})
    }
    StationForDdl(){
    return this.http.post(this.API_Url + 'Station/StationForDdl', {})
    }

    addStation(data:any){
      return this.http.post(this.API_Url + 'Station/StationAdd', data)
      }

      updateStation(data:any){
        return this.http.post(this.API_Url + 'Station/StationUpdate', data)
        }

        deleteStation(data:any){
          return this.http.post(this.API_Url + 'Station/StationDelete', data)
          }

          getStationByStationId(data:any){
            return this.http.post(this.API_Url + 'Station/StationByStationId', data)
            }


           



    
}
