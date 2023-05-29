import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import AuthService from './auth.service';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
 path:ActivatedRouteSnapshot;
 route: ActivatedRouteSnapshot;

 constructor(private authService:AuthService,private router: Router) { 

 }

canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot){
  this.authService.redirectUrl = state.url;
  console.log("routes for logging in auth-guard",state.url);
  if(this.authService.isUserLoggedIn){
    return true;
    
  }
  this.router.navigateByUrl('/auth')

  return false;
}
}
