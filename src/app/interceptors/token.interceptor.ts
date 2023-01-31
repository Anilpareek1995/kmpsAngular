import { Injectable } from '@angular/core';
import { HttpRequest,HttpHandler,HttpEvent,HttpInterceptor } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { tokenPath } from '../models/site-map.Model';
import { SharedService } from '../services/shared.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private sharedservice:SharedService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.sharedservice.openSppinerModel();
    let token = localStorage.getItem(tokenPath);
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${token}`
        }
      });
    }
    return next.handle(request).pipe(finalize(()=>this.sharedservice.closeSpinnerModel()));
  }
}
