
import {paymentRecievedService} from '../payment-recieved.service';
import { Component, OnInit, NgZone, ViewChild} from '@angular/core';

import {Router, RouterModule} from '@angular/router';
import * as moment from 'moment';
import * as _ from "lodash";
import {BaseChartDirective} from 'ng2-charts';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ToasterContainerComponent, ToasterService, ToasterModule} from 'angular2-toaster';


@Component({
  selector: 'app-payment-recieved-history', 
  templateUrl: './payment-history.html',
  styleUrls: ['./payment-history.scss'], 
  providers: [ToasterService]   
})

export class PaymentHistoryComponent {

    constructor() {
        
    }


}