import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Subject } from 'rxjs/internal/Subject';
import { User } from '../user';
import { catchError, switchMap } from 'rxjs/operators';
import { EMPTY, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { EMPTY_OBSERVER } from 'rxjs/internal/Subscriber';

interface UserDTO{
  user: User ;
  token: string;

}
@Injectable({
  providedIn: 'root'
})
export default class AuthService {
  [x: string]: any;
  private user$ = new Subject<User>();
  private apiUrl = '/api/auth/';
  // private tokenStorage : TokenStorageService;
  constructor(private httpClient:HttpClient, private tokenStorage: TokenStorageService) { }

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
          return of(user);
        }
      ),
      catchError(e=>{
        console.log(`Please try again`,e);
        return throwError(()=>`Your login credentials details could not be verified.Please, try again.`)
      })
    );
  }
  logout() {
    // clean up subject
    // remove user from subject
    this.setUser(null);

    // remove token from localStorage
    this.tokenStorage.removeToken();
    console.log('user has been loggged out');
  }
  get user(){
    return this.user$.asObservable();
  }
  private setUser(user: any){
    this.user$.next(user);
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

        return throwError(()=>`Registration failed please contact to admin`);
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
  return  this.httpClient.get<User>(`${this.apiUrl}findme`).pipe(
    switchMap(
      ({user})=>{
        this.setUser(user);
        console.log(typeof(user));
        console.log(`user found aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,user);
        
        // if(user === null){
        //   return throwError(()=>`Your login credentials details could not be verified.Please, try again.`)
        // }
        return of(user);
      }
    ),
    catchError(e=>{
      console.log(`Please try again`,e);
      return throwError(()=>`Your login credentials details could not be verified.Please, try again.`)
    })
  ); 

}
}