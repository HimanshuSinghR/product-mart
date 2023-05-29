import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, concat, forkJoin, merge } from 'rxjs';
import AuthService from '../../core/auth/auth.service';
import { User } from '../../core/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'product-mart';
  user$ :  Observable<User>;
  user:User;
  constructor(private authService: AuthService, private router: Router){


   
  }
  
  

  ngOnInit(): void {
    // console.log('ussr',this.user$);
    // if(this.user$){
      // this.user$ = this.authService.findMe();
    // this.newUser$ = 
   
    // this.user$ = merge(this.authService.findMe(),this.authService.user);
    // this.user$ = this.authService.findMe();
    // this.user$.subscribe(user=>(this.user = user));
    this.authService.findMe();
    this.user$ = this.authService.getUser;
    // this.user$ = this.authService.findMe();
    
    // console.log("check login user",this.authService.user);
    // this.authService.user = this.user$;
    // merge(this.user$,this.authService.user);
    // console.log("auth service user",this.authService.user);

    // this.user$ = this.authService.findMe();
    // }
    // this.userSubscription = this.authService.findMe().subscribe(user=>(this.user = user));
    // console.log('ussr',this.authService.getUser.subscribe(v=>console.log("observable value",v)));

  }
  logout(){
    this.authService.logout();
    // this.user$.unsubscribe()
    this.router.navigate(['/auth']);
  }

 
}
