import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import AuthService from '../../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  email: any;
  password: any;
  error: string;
  constructor(private router: Router,private authService: AuthService){

  }
  login(){
    this.error = '';
    this.authService.login(this.email,this.password).subscribe(s=>this.router.navigate(['']),
    e=> (this.error = e)
    );
    // this.router.navigate(['']);
  }

}
