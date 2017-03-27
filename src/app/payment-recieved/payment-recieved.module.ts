import { paymentRecievedService } from './payment-recieved.service';
import { PaymentRecievedRouting } from './payment-recieved.routing';
import { PaymentRecievedComponent } from './payment-recieved.component';
import {ChartsModule} from 'ng2-charts'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,PaymentRecievedRouting,ChartsModule
  ],
  declarations: [PaymentRecievedComponent],
    providers: [paymentRecievedService]
})
export class PaymentRecievedModule{}