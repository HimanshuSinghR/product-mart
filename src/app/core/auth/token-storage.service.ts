import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  TOKEN_KEY = "ProductMart.AuthToken";
 
  constructor() {
   }
   setToken(token: string){
    if(!token){
      return;
    }
    this.removeToken();

    window.localStorage.setItem(this.TOKEN_KEY,token);
   }
   
   getToken(){
    console.log("inside get token");
    return window.localStorage.getItem(this.TOKEN_KEY);                                         
   }

   removeToken(){
    window.localStorage.removeItem(this.TOKEN_KEY);
   }
}
