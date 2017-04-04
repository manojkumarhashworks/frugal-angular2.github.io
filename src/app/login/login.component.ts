import { AuthService } from './../core/auth.service';
import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import {LoginService} from './login.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
    selector:'finplan-login',
    templateUrl:'./login.html',
    styleUrls:['./login.scss']
})

export class LoginComponent {

 constructor(private loginService: LoginService, private authService: AuthService, private router: Router){

 }

loginUser(login) {
     this.loginService.loginUser(login.value)
    .subscribe(
      data => {
        this.authService.userLoggedIn = true;
         this.router.navigate(['/paymentrecieved']);
         console.log('You have logged in');
      },
      error => {
         var toast: any = {
          type: 'error',
          body: 'There is some error in login please try again',
          timeout: 5000
        };
      
        console.log('Erro in Login');
       
      }
      );
}

}