import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Subject } from 'rxjs/internal/Subject';
import { User } from './user';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export default class AuthService {
  [x: string]: any;
  private user$ = new Subject<User>();
  private apiUrl = '/api/auth/';
  constructor(private httpClient:HttpClient) { }

  login(email: string,password: string){
    const loginCredentials = { email,password };
    console.log('login credentials', loginCredentials);
    return of(loginCredentials);
  }
  logout() {
    // clean up subject
    // remove user from subject
    this.setUser(null);
    console.log('user has been loggged out');
  }
  get user(){
    return this.user$.asObservable();
  }
  private setUser(user: any){
    this.user$.next(user);
  }

  register(user: any){
    // make api call to save user in db
    // update the user subject
    return this.httpClient.post(`${this.apiUrl}register`,user).pipe
    (
      switchMap(savedUser => {
        this.setUser(savedUser);
        console.log(`user registered successfully`,savedUser);
        return of(savedUser);
      }),
      catchError(e => {
        console.log(`server error occured`,e);

        return throwError(()=>`Registration failed please contact to admin`);
      })
    );
  }
}
