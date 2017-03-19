import { PaymentRecievedRouting } from './payment-recieved.routing';
import { PaymentRecievedComponent } from './payment-recieved.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,PaymentRecievedRouting
  ],
  declarations: [PaymentRecievedComponent]
})
export class PaymentRecievedModule{}