import { PaymentRecievedHistoryService } from './payment-history/payment-history.service';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { paymentRecievedService } from './payment-recieved.service';
import { PaymentRecievedRouting } from './payment-recieved.routing';
import { PaymentRecievedComponent } from './payment-recieved.component';
import {ChartsModule} from 'ng2-charts'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToasterModule, ToasterService} from 'angular2-toaster';


@NgModule({
  imports: [
    CommonModule,PaymentRecievedRouting,ChartsModule, NgbModule.forRoot(),ToasterModule,FormsModule
  ],
  declarations: [PaymentRecievedComponent,PaymentHistoryComponent],
    providers: [paymentRecievedService,PaymentRecievedHistoryService]
})
export class PaymentRecievedModule{}