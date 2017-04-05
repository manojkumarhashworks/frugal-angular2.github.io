import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { AuthGuard } from './../core/auth.guard';
import { PaymentRecievedComponent } from './payment-recieved.component';
import { RouterModule,Router } from '@angular/router';
import { NgModule } from '@angular/core';


@NgModule({
    imports:[RouterModule.forChild([
        {
            path:'paymentrecieved',
            component:PaymentRecievedComponent,
            canActivate:[AuthGuard]
        },
         {
            path:'paymentrecieved/history',
            component:PaymentHistoryComponent,
            canActivate:[AuthGuard]
        }
    ]) ],
    exports:[RouterModule]
})

export class PaymentRecievedRouting {}