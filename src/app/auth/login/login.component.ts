import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import AuthService from '../../core/auth/auth.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  
  email: any;
  password: any;
  error: BehaviorSubject<string>;
  constructor(private router: Router,private authService: AuthService){

  }
  ngOnInit(){
    this.error = new BehaviorSubject("");
  }
  login(){
    this.error.next('');
    this.authService.login(this.email,this.password).subscribe(s=>this.router.navigate(['']),
    e=> (this.error.next(e))
    );
    // this.router.navigate(['']);
  }

}
