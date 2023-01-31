import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoodsRecieptService {

  API_Url = environment.API_Url
  constructor(private http:HttpClient) { }

  
  GRAddUpdate(data:any){ 
return this.http.post(this.API_Url + 'Booking/GRAddUpdate', data)
}

GrByGrId(data:any){ 
  return this.http.post(this.API_Url + 'Booking/GetGrByGrId?GRId='+data,{})
  }

  GetGRIdByGRNo(data:any){ 
    return this.http.post(this.API_Url + 'Booking/GetGRIdByGRNo?GRNo='+data,{})
    }

    GRDelete(data:any){ 
      return this.http.post(this.API_Url + 'Booking/GRDelete?GRId='+data,{})
      }


}
