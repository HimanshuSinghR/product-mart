import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHeaderIntercetporService implements HttpInterceptor{

  constructor(private tokenStorage: TokenStorageService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenStorage.getToken();
    const clonedRequest = req.clone({
      headers: req.headers.set(
        "Authorization",token? `Bearer ${token}`: '')
    });
    return next.handle(clonedRequest);
  }   
}
