import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrokerService {

  API_Url = environment.API_Url
  constructor(private http:HttpClient) { }


  BrokerAll(){ 
return this.http.post(this.API_Url + 'Broker/BrokerAll', {})
}

BrokerForDdl(){ 
  return this.http.post(this.API_Url + 'Broker/BrokerForDdl', {})
  }

  BrokerAdd(data:any){ 
    return this.http.post(this.API_Url + 'Broker/BrokerAdd', data)
    }

    BrokerUpdate(data:any){ 
      return this.http.post(this.API_Url + 'Broker/BrokerUpdate', data)
      }

      BrokerDelete(data:any){ 
        return this.http.post(this.API_Url + 'Broker/BrokerDelete', data)
        }

        BrokerByBrokerId(data:any){ 
          return this.http.post(this.API_Url + 'Broker/BrokerByBrokerId', data)
          }


}
