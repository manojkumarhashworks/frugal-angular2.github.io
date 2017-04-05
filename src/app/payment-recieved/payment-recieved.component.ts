
import {paymentRecievedService} from './payment-recieved.service';
import { Component, OnInit, NgZone, ViewChild} from '@angular/core';

import {Router, RouterModule} from '@angular/router';
import * as moment from 'moment';
import * as _ from "lodash";
import {BaseChartDirective} from 'ng2-charts';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ToasterContainerComponent, ToasterService, ToasterModule} from 'angular2-toaster';


@Component({
  selector: 'app-payment-recieved', 
  templateUrl: './payment-recieved.component.html',
  styleUrls: ['./payment-recieved.component.scss'], 
  providers: [ToasterService]   
})
export class PaymentRecievedComponent implements OnInit {

  @ViewChild(BaseChartDirective)chart : BaseChartDirective;

  constructor(private paymentrecivedservice : paymentRecievedService, public zone : NgZone, private modalService : NgbModal, private toastr : ToasterService) {}

  ngOnInit() {
    this.tlrGraph();
    this.orGraph();
    this.getPaymentList();
    this.tlrMetric();
    this.undistributedFund();
    this.orMetricValue();
    this.getHistoryLevel1();
    this.getHistoryLevel2();
  }

showAllPyament=[];
  searchFilter=[{
    name:'RECEIVED'
  },
  {
    name:'ALLOCATED'
  }]

  filterStatus(value) {
    //     if(this.allPaymentList.length === 0) {
    //   return value;
    // }
    // let resultArray = [];
    // for (let item of this.allPaymentList) {
    //   if(item.depositStatus.match(value) != null) {
    //     resultArray.push(item);
    //   }
    // }
    // this.showAllPyament = resultArray;
    this.showAllPyament = 
    this.allPaymentList.filter((item)=> {
      return item.depositStatus.match(value) != null
    })
  }
 
  graphMonths : Array < String > = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
   graphMonths1 : Array < String > = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  closeResult : string;
  public mr : NgbModalRef;

  historyData : any[];
  historyData1: any[];

  open(content) {
    this.mr = this
      .modalService
      .open(content);
    this
      .mr
      .result
      .then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  public closeModal() {
    this
      .mr
      .close();
  }

  private getDismissReason(reason : any) : string {
    if(reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  selectedMonth : any = "January";
  selectedMonth1:any = "January";
  //metric value
  tlrMetricValue : any;
  unDistributedMetricValue : any;
  OutStandingMetricValue : any;

  selectedFunds;
  any;
  oneYear : any = {};
  allPaymentList : any = [];
  orLabel : any;
  orValue : any;
  tlrValue : any;
  // test() {   console.log(this.oneYearCalender()) }

  getMonthValue(value) {
    this.history1();
  }

  getMonthValue1(value) {
    this.history2();
  }

  selectedAllocatedFund(value) {
    this.selectedFunds = value;
  }

  allocateFund(value) {
    console.log(value)
    this
      .paymentrecivedservice
      .setAllocateFund(value.depositID)
      .subscribe(data => {
        console.log(data);
        this.tlrMetric();
        this.getPaymentList();
        this.tlrGraph();
        this.orGraph();
        const toast : any = {
          type: 'success',
          body: `You have successfully allocated the fund`,
          timeout: 2000
        };
        this
          .toastr
          .pop(toast);
        this.closeModal();
      }, error => {
        console.log(error);
      })
  }

  oneYearCalender() {
   
    let currentDate : any = moment();
    let startDate = currentDate
      .subtract(2, "y")
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
        this.showAllPyament = this.allPaymentList;
      }, error => {
        console.log(error);
      })
  }

  tlrMetric() {
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
      .getTrlMetricValue(this.oneYear)
      .subscribe(data => {
       
        this.tlrMetricValue = data;
      }, error => {
        console.log(error);
      })
  }

  undistributedFund() {
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
      .getUndistributedFundMetric(this.oneYear)
      .subscribe(data => {
        this.unDistributedMetricValue = data[0].UndistributedFund;
      }, error => {
        console.log(error);
      })
  }

  orMetricValue() {
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
      .getOrMetricValue(this.oneYear)
      .subscribe(data => {
        this.OutStandingMetricValue = data;
      }, error => {
        console.log(error);
      })
  }

  getHistoryLevel1() {
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
      .getHistoryLevel1(this.oneYear)
      .subscribe(data => {

        this.historyData = data;
        this.history1();
      }, error => {
        const toast : any = {
          type: 'error',
          body: `Error in Fetching History Level 1 Graph`,
          timeout: 2000
        };
        this
          .toastr
          .pop(toast);
      })
  }

  getHistoryLevel2() {
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
      .getHistoryLevel2(this.oneYear)
      .subscribe(data => {

        this.historyData1 = data;
        this.history2();
        console.log(data);
      }, error => {
        const toast : any = {
          type: 'error',
          body: `Error in Fetching History Level 1 Graph`,
          timeout: 2000
        };
        this
          .toastr
          .pop(toast);
      })
  }

  private history1() : void {

    let temp = [];
    let month = this.selectedMonth;
    let index = -1;
    let data = this.historyData;
    for (let i = 0; i < data.length; i++) {

      if (data[i].monthName === month) {
        index = i;
        break;
      }
    }

    if (index === -1) {
      temp = [];
    } else {
      temp[0] = data[index].categoryDetails[0].categoryAmountAllocatedTotal;
      temp[1] = data[index].categoryDetails[1].categoryAmountAllocatedTotal;
      temp[2] = data[index].categoryDetails[2].categoryAmountAllocatedTotal;

    }

    //  this.barChartData[0].data=[200,100,50];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = temp;
    this.barChartData = clone;
    //this.barChartData[0].data.splice(0);
  }

    private history2() : void {

    let temp = [];
    let month = this.selectedMonth1;
    let index = -1;
    let data = this.historyData1;
    for (let i = 0; i < data.length; i++) {

      if (data[i].monthName === month) {
        index = i;
        break;
      }
    }

    if (index === -1) {
      temp = [];
    } else {
      temp[0] = data[index].categoryDetails[0].categoryAmountAllocatedTotal;
      temp[1] = data[index].categoryDetails[1].categoryAmountAllocatedTotal;
      temp[2] = data[index].categoryDetails[2].categoryAmountAllocatedTotal;

    }

    //  this.barChartData[0].data=[200,100,50];
    let clone = JSON.parse(JSON.stringify(this.barChartData1));
    clone[0].data = temp;
    this.barChartData1 = clone;
    //this.barChartData[0].data.splice(0);
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
    responsive: true,
    maintainAspectRatio: true
  };
  public barChartLabels : string[] = ['Cost of Service', 'Tax', 'Real Revenue'];
  public barChartType : string = 'bar';
  public barChartLegend : boolean = true;

  public barChartData : any[] = [
    {
      data: [],
      label: 'Series A'
    }
  ];

  public barChartColor : Array < any > = [
    {
      backgroundColor: '#86C7F3'
    }
  ]



   public barChartOptions1 : any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: true
  };
  public barChartLabels1 : string[] = ['Operating Expenses', 'Company Profit', 'Owners Payout'];
  public barChartType1 : string = 'bar';
  public barChartLegend1 : boolean = true;

  public barChartData1 : any[] = [
    {
      data: [],
      label: 'Series A'
    }
  ];

  public barChartColor1 : Array < any > = [
    {
      backgroundColor: '#86C7F3'
    }
  ]

}
