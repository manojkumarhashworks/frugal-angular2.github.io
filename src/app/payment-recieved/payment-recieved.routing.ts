import { PaymentRecievedComponent } from './payment-recieved.component';
import { RouterModule,Router } from '@angular/router';
import { NgModule } from '@angular/core';


@NgModule({
    imports:[RouterModule.forChild([
        {
            path:'paymentrecieved',
            component:PaymentRecievedComponent
        }
    ]) ],
    exports:[RouterModule]
})

export class PaymentRecievedRouting {}