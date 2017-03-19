import { PaymentRecievedModule } from './payment-recieved/payment-recieved.module';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


/* Routing Main Module */
import { AppComponent } from './app.component';

/* Module Imports */
import { LoginModule } from './login/login.module';
import { FundDistributionComponent } from './fund-distribution/fund-distribution.component';

@NgModule({
  declarations: [
    AppComponent,
    FundDistributionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    LoginModule,
    AppRoutingModule,
    PaymentRecievedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
