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
  user$:Observable<User>;
  userSubscription:Subscription;
  newSubscription:Subscription;
  constructor(private authService: AuthService, private router: Router){


   
  }
  
  

  ngOnInit(): void {
    this.user$ = merge(this.authService.findMe(),this.authService.user$);

  }
  logout(){

    this.authService.logout();
    this.router.navigate(['/auth']);
  }

 
}
