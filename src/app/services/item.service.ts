import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  API_Url = environment.API_Url
  constructor(private http:HttpClient) { }
  getItemAll(){
    return this.http.post(this.API_Url + 'Item/ItemAll', {})
    }

    getItemforDdl(){
      return this.http.post(this.API_Url + 'Item/ItemForDdl', {})
      }

    AddItem(data:any){
      return this.http.post(this.API_Url + 'Item/ItemAdd', data)
      }

      UpdateItem(data:any){
        return this.http.post(this.API_Url + 'Item/ItemUpdate', data)
        }

        getItemByItemId(data:any){
          return this.http.post(this.API_Url + 'Item/ItemByItemId', data)
          }

          deleteItem(data:any){
            return this.http.post(this.API_Url + 'Item/ItemDelete', data)
            }

   
}
