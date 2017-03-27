import {paymentRecievedService} from './payment-recieved.service';
import {Component, OnInit, NgZone, ViewChild} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import * as moment from 'moment';
import * as _ from "lodash";
import {BaseChartDirective} from 'ng2-charts';
@Component({selector: 'app-payment-recieved', templateUrl: './payment-recieved.component.html', styleUrls: ['./payment-recieved.component.scss']})
export class PaymentRecievedComponent implements OnInit {

  @ViewChild(BaseChartDirective)chart : BaseChartDirective;

  constructor(private paymentrecivedservice : paymentRecievedService, public zone : NgZone) {}

  ngOnInit() {
    this.tlrGraph();
    this.orGraph();
    this.getPaymentList();
  }

  oneYear : any = {};
  allPaymentList : any = [];
  orLabel : any;
  orValue : any;
  tlrValue : any;
  // test() {
  //   console.log(this.oneYearCalender())
  // }
  oneYearCalender() {
    let currentDate : any = moment();
    let startDate = currentDate
      .subtract(1, "y")
      .format("YYYY-MM-DD");
    let endDate = moment().format("YYYY-MM-DD");
    return {startDate: startDate, endDate: endDate}
  }

  tlrGraph() {
    this.oneYear = {
      endDate: this
        .oneYearCalender()
        .endDate,
      startDate: this
        .oneYearCalender()
        .startDate
    }
    this
      .paymentrecivedservice
      .gettlrGraph(this.oneYear)
      .subscribe(data => {

        //  this.tlrValue = _.map(data,'monthTlr');   this.lineChartData[1].data =
        // this.tlrValue;     this.chart.chart.update();

        let op = [];

        let startDate = moment(this.oneYear.startDate);
        let endDate = moment(this.oneYear.endDate);
        for (let i = startDate; i <= endDate;) {
          let flag = 0;
          for (let j = 0; j < data.length; j++) {
            let date = new Date(data[j].dateValue);

            let dateFormat = moment(date).format('YYYY-MM')
            if (dateFormat == i.format('YYYY-MM')) {
              op.push(data[j].monthTlr);
              flag = 1;
              break;
            }

          }
          if (!flag) {
            op.push(0);
          }

          i.add(1, 'months')

        }
        // console.log('tlr', op);

        this.lineChartData[1].data = op;
        this
          .chart
          .chart
          .update();

      }, error => {
        console.log(error);
      })
  }

  orGraph() {
    this.oneYear = {
      endDate: this
        .oneYearCalender()
        .endDate,
      startDate: this
        .oneYearCalender()
        .startDate
    }
    this
      .paymentrecivedservice
      .getorGraph(this.oneYear)
      .subscribe(data => {
        this.orValue = _.map(data, 'outstandingReceivables');
        var op = [];
        this.lineChartLabels = [];
        let startDate = moment(this.oneYear.startDate);
        let endDate = moment(this.oneYear.endDate);
        for (let i = startDate; i <= endDate;) {
          let flag = 0;
          this
            .lineChartLabels
            .push(i.format('MMM-YYYY'))
          for (let j = 0; j < data.length; j++) {
            let date = new Date(data[j].dateValue);

            let dateFormat = moment(date).format('YYYY-MM')
            if (dateFormat == i.format('YYYY-MM')) {
              op.push(data[j].outstandingReceivables);
              flag = 1;
              break;
            }

          }
          if (!flag) {
            op.push(0);
          }

          i.add(1, 'months')

        }
        // console.log('or', op);

        this.lineChartData[0].data = op;

        if (this.chart && this.chart.chart && this.chart.chart.config) {
          this.chart.chart.config.data.labels = this.lineChartLabels;
          this
            .chart
            .chart
            .update();
        }

      }, error => {
        console.log(error);
      })
  }

  getPaymentList() {
    this.oneYear = {
      endDate: this
        .oneYearCalender()
        .endDate,
      startDate: this
        .oneYearCalender()
        .startDate
    }
    this
      .paymentrecivedservice
      .getPaymentReceivedList(this.oneYear)
      .subscribe(data => {
        this.allPaymentList = data;
      }, error => {
        console.log(error);
      })
  }

  public lineChartData : Array < any > = [
    {
      data: [],
      label: 'Series A'
    }, {
      data: [],
      label: 'Series B'
    }
  ];
  public lineChartLabels : Array < any > = [];
  public lineChartOptions : any = {
    responsive: true
  };
  public lineChartColors : Array < any > = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }, { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend : boolean = true;
  public lineChartType : string = 'line';

  public barChartOptions : any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels : string[] = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012'
  ];
  public barChartType : string = 'bar';
  public barChartLegend : boolean = true;

  public barChartData : any[] = [
    {
      data: [
        65,
        59,
        70,
        81,
        56,
        55,
        40
      ],
      label: 'Series A'
    }
  ];

  public barChartColor : Array < any > = [
    {
      backgroundColor: '#86C7F3'
    }
  ]

}
