import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Subject } from 'rxjs/internal/Subject';
import { User } from '../user';
import { catchError, switchMap } from 'rxjs/operators';
import { BehaviorSubject, EMPTY, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { EMPTY_OBSERVER } from 'rxjs/internal/Subscriber';
import { LogService } from '@core/log.service';

interface UserDTO{
  user: User ;
  token: string;

}
@Injectable({
  providedIn: 'root'
})
export default class AuthService {
  [x: string]: any;
  private user$ = new BehaviorSubject<User>(null);
  private apiUrl = '/api/auth/';
  private redirectUrlAfterLogin = '';
  // private tokenStorage : TokenStorageService;
  constructor(private httpClient:HttpClient, private tokenStorage: TokenStorageService,private logService: LogService) { 

  }

  get isUserLoggedIn(){
    console.log("user",this.user$.value);
    return this.user$.value!==null;
  }
  
  set redirectUrl(url:string){
    this.redirectUrlAfterLogin = url;
  }
  login(email: string,password: string){
    const loginCredentials = { email,password };
    console.log('login credentials', loginCredentials);
    return this.httpClient.post<UserDTO>(`${this.apiUrl}login`,loginCredentials).pipe(
      switchMap(
        ({user,token})=>{
          this.setUser(user);
          this.tokenStorage.setToken(token);
          console.log(user,token);
          console.log(`user found`,user);
          if(user === null){
            return throwError(()=>`Your login credentials details could not be verified.Please, try again.`)
          }
          console.log("routes for logging in",this.redirectUrlAfterLogin);
          return of(this.redirectUrlAfterLogin);
        }
      ),
      catchError(e=>{
        console.log(`Please try again`,e);
        this.logService.log(`Server Error Occured ${e.error.message}`,e);
        return throwError(()=>`Your login credentials details could not be verified.Please, try again.`)
      })
    );
  }
  logout() {
    // clean up subject
    // remove user from subject
    this.setUser(null);
    console.log("user")
    // remove token from localStorage
    this.tokenStorage.removeToken();
    console.log('user has been loggged out');

    // return this.user$;
  }
  get getUser(){
    return this.user$.asObservable();
  }
  private setUser(user: any){
    console.log("user in set User",user);
    if(user){
    const newUser = {...user,id: user._id};
    this.user$.next(newUser);
    this.logService.log("Logged in User",newUser); 
    }
    else{
      this.user$.next(null);
    }
  }

  register(userToSave: any){
    // make api call to save user in db
    // update the user subject
    return this.httpClient.post<any>(`${this.apiUrl}register`,userToSave).pipe
    (
      switchMap(( {user,token}) => {
        this.setUser(user);
        this.tokenStorage.setToken(token);
        console.log("token and user",token,user);
        console.log(`user registered successfully`,user);
        
        return of(user);
      }),
      catchError(e => {
        console.log(`server error occured`,e);
        return throwError("Your details are not right for reigistration")
      })
    );
  }
  findMe():Observable<any> {
    console.log("token check");
    
    const token = this.tokenStorage.getToken();
    console.log("token getting or not",token);
    if( !token ) {
      // const user = null;
      return EMPTY;
  }
  return this.httpClient.get<any>(`${this.apiUrl}findme`).pipe(
    switchMap(
      ({user,token})=>{
        console.log("api success");
        return this.setUserAfterUserFoundFromServer(user, token);
      }
    ),
    catchError(e=>{
      console.log(`Please try again`,e);
      return throwError("Error is coming from the server side")
    })
  ); 

}
private setUserAfterUserFoundFromServer(user: User,token: string){
  this.setUser(user);
  this.tokenStorage.setToken(token);
  this.logService.log(`User found in Server`,user);
  return of(user);
}


}