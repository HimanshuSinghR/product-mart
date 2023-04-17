import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import AuthService from '../../core/auth/auth.service';
import { User } from '../../core/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy,OnInit{
  title = 'product-mart';
  user: Observable<User> ;
  userSubscription!: Subscription;
  constructor(private authService: AuthService, private router: Router){


    // this.userSubscription=this.authService.user.subscribe(user=>(this.user = user));
    // if(this.user)

  }
  
  
  ngOnDestroy(): void {
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.user = this.authService.getUser;
    console.log('ussr',this.user);

    // this.userSubscription = this.authService.findMe().subscribe(user=>(this.user = user));
    console.log('ussr',this.user);

  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }


}
