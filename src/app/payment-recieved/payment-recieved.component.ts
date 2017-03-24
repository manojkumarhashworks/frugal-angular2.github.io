import { paymentRecievedService } from './payment-recieved.service';
import { Component, OnInit } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-payment-recieved',
  templateUrl: './payment-recieved.component.html',
  styleUrls: ['./payment-recieved.component.scss']
})
export class PaymentRecievedComponent implements OnInit {

  constructor(private paymentrecivedservice:paymentRecievedService) { }

  ngOnInit() {
    this.tlrGraph();
    this.getPaymentList();
  }

 oneYear:any = {};
  allPaymentList:any = []

  test() {
    console.log(this.oneYearCalender())
  }
  oneYearCalender() {
      let currentDate:any = moment();
       let startDate = currentDate.subtract(1,"y").format("YYYY-MM-DD");
       let endDate = moment().format("YYYY-MM-DD");
      return  {  
          startDate : startDate,
          endDate : endDate
      }
  }

  tlrGraph() {
    this.paymentrecivedservice.gettlrGraph(this.oneYearCalender().startDate,this.oneYearCalender().endDate)
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
          console.log(error);
      }
    )
  }

  getPaymentList() {
      this.oneYear = {
       endDate:this.oneYearCalender().endDate,
         startDate: this.oneYearCalender().startDate
      }
      debugger
    this.paymentrecivedservice.getPaymentReceivedList(this.oneYear)
    .subscribe(
      data => {
        this.allPaymentList.push(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';


   public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 70, 81, 56, 55, 40], label: 'Series A'}
  ];

  public barChartColor:Array<any> = [
    {
        backgroundColor: '#86C7F3',
    }
  ]
 
  
}
