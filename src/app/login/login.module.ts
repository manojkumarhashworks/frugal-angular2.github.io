import { LoginRoutingModule } from './login-routing';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,LoginRoutingModule,FormsModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
