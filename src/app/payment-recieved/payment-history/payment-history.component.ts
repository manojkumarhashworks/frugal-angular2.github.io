import { PaymentRecievedHistoryService } from './payment-history.service';

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

export class PaymentHistoryComponent implements OnInit {

    constructor(private paymentrecievedhistory:PaymentRecievedHistoryService) {
    }

ngOnInit() {
this.historyDetails()
}

oneYear:any;

//store elements

historyAllDetails:any;
metricDetails:any;
 oneYearCalender() {
   
    let currentDate : any = moment();
    let startDate = currentDate
      .subtract(1, "y")
      .format("YYYY-MM-DD");
    let endDate = moment().format("YYYY-MM-DD");
    return {startDate: startDate, endDate: endDate}
  } 


  historyDetails() {
    this.oneYear = {
      endDate:this.oneYearCalender().endDate,
      startDate:this.oneYearCalender().startDate
    }
    this.paymentrecievedhistory.getPaymentHistoryDetails(this.oneYear)
    .subscribe(data => {
        this.historyAllDetails = data.totalPaymentReceivedSum;
        this.metricDetails = _.cloneDeep(data);
        console.log(this.metricDetails)
    },error => {
      console.log(error);
    })
  }

}