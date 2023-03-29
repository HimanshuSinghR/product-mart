import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import AuthService from './auth.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  title = 'product-mart';
  user!: User;
  userSubscription!: Subscription;
  constructor(private authService: AuthService, private router: Router){

    this.authService.findMe().subscribe(user=>(this.user = user));

    this.userSubscription=this.authService.user.subscribe(user=>(this.user = user));
    // if(this.user)

  }
  
  ngOnDestroy(): void {
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }

  logout(){
    // remove user from subject
    // remove token from local storage
    this.authService.logout();
    this.router.navigate(['/']);
  }


}
