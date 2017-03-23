import { PaymentRecievedModule } from './payment-recieved/payment-recieved.module';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { APP_CONFIG, AppConfig } from './app.config';
 
/* Routing Main Module */
import { AppComponent } from './app.component';

/* Module Imports */
import { LoginModule } from './login/login.module';
import { FundDistributionModule } from './fund-distribution/fund-distribution.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    LoginModule,
    AppRoutingModule,
    PaymentRecievedModule,
    ChartsModule,
    FundDistributionModule
  ],
   providers: [{ provide: APP_CONFIG, useValue: AppConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
