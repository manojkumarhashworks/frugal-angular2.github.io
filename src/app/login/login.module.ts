import { LoginService } from './login.service';
import { LoginRoutingModule } from './login-routing';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,LoginRoutingModule,FormsModule,ReactiveFormsModule
  ],
     declarations: [LoginComponent],
   providers: [LoginService]
})
export class LoginModule { }
