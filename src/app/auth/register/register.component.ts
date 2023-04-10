import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import AuthService from '../../core/auth/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  // private passwordMatch:false;
  userGroup = new FormGroup({
      fullname : new FormControl('',[Validators.required]),
      email :    new FormControl('',[Validators.required,Validators.email]),
      password : new FormControl('',[Validators.required]),
      repeatPassword: new FormControl('',[Validators.required,this.passwordMatch])
  
    }
    );
    
    constructor(private router: Router,private authService: AuthService){
      
    }
  ngOnInit(){

  }
  passwordMatch(control:FormControl){
    let password = control.root.get('password');
    // console.log(password.value,control.value);
    return password && control.value !== password.value?
    {
      passwordMatch:true
    }
    :null;
  }
  register(){
    if( this.userGroup.valid ){
    const user = this.userGroup.getRawValue();
    this.authService.register(user).subscribe(s => this.router.navigate(['/login']));
    }
    else{
      return ;
    }
  }

  get fullname(){
    return this.userGroup.get('fullname');
  }
  get email(){
    return this.userGroup.get('email');
  }
  get password(){
    return this.userGroup.get('password');
  }

  get repeatPassword(){
    return this.userGroup.get('repeatPassword');
  }
}
