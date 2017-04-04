import { AuthService } from './../core/auth.service';
import {Injectable, Inject} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Rx';
import {Router} from '@angular/router';
import {APP_CONFIG, IAppConfig} from '../app.config';

@Injectable()

export class paymentRecievedService {

  constructor(private http : Http, private router : Router, @Inject(APP_CONFIG)private config : IAppConfig,private authservice:AuthService) {}


  setAllocateFund(allocate) {
     const body = JSON.stringify({
	"depositID":allocate
}
);
    const headers = new Headers();
    headers.append('token', this.authservice.getLoggedInUser().token);
 headers.append('Content-Type', 'application/json');
     return this.http.post(this.config.apiEndpoint + '/deposit/allocateFundToTlr',body,{headers:headers})
    .map((data : Response) => {
      return data.json().message;
     
    })
    .catch(this.handleError)
  }

  gettlrGraph(date : any) {
    const body = JSON.stringify(date);
    const headers = new Headers();
    headers.append('token', this.authservice.getLoggedInUser().token);
 headers.append('Content-Type', 'application/json');
    return this
      .http
      .post(this.config.apiEndpoint + '/deposit/getTlrGraphDetails', JSON.stringify(date), {headers: headers})
      .map((data : Response) => {
        return data
          .json()
          .results;
      })
      .catch(this.handleError);
  }

  getorGraph(date : any) {
    const body = JSON.stringify(date);
    const headers = new Headers();
    headers.append('token', this.authservice.getLoggedInUser().token);
 headers.append('Content-Type', 'application/json');
    return this
      .http
      .post(this.config.apiEndpoint + '/deposit/getOrGraphDetails', JSON.stringify(date), {headers: headers})
      .map((data : Response) => {
        return data
          .json()
          .results;
      })
      .catch(this.handleError);
  }

  getPaymentReceivedList(date : any) {
    const body = JSON.stringify(date);
    const headers = new Headers();
    headers.append('token', this.authservice.getLoggedInUser().token);
 headers.append('Content-Type', 'application/json');
    return this
      .http
      .post(this.config.apiEndpoint + '/deposit/getPaymentReceivedList', JSON.stringify(date), {headers: headers})
      .map((data : Response) => {
        return data
          .json()
          .results;
      })
      .catch(this.handleError);
  }


  getTrlMetricValue(date:any) {
    const body = JSON.stringify(date);
    const headers = new Headers();
    headers.append('token', this.authservice.getLoggedInUser().token);
 headers.append('Content-Type', 'application/json');
    return this
      .http
      .post(this.config.apiEndpoint + '/deposit/getTlrSum', JSON.stringify(date),{headers: headers})
      .map((data : Response) => {
       
        return data
          .json().topLineRevenue;
      })
      .catch(this.handleError);
  }


getUndistributedFundMetric(date) {
   const body = JSON.stringify(date);
    const headers = new Headers();
    headers.append('token', this.authservice.getLoggedInUser().token);
 headers.append('Content-Type', 'application/json');
    return this
      .http
      .post(this.config.apiEndpoint + '/deposit/getUndistributedDepositSum', JSON.stringify(date),{headers: headers})
      .map((data : Response) => {
        return data
          .json().results;
      })
      .catch(this.handleError);
}

getOrMetricValue(date:any) {
   const body = JSON.stringify(date);
    const headers = new Headers();
    headers.append('token', this.authservice.getLoggedInUser().token);
 headers.append('Content-Type', 'application/json');
    return this
      .http
      .post(this.config.apiEndpoint + '/deposit/getOutstandingReceivables', JSON.stringify(date),{headers: headers})
      .map((data : Response) => {
        return data
          .json().outstandingReceivables;
      })
      .catch(this.handleError);
}

getHistoryLevel1(date:any) {
    const body = JSON.stringify(date);
    const headers = new Headers();
    console.log(date)
    headers.append('token', this.authservice.getLoggedInUser().token);
 headers.append('Content-Type', 'application/json');
    return this
      .http
      .post(this.config.apiEndpoint + '/deposit/categoryHistoryLevel1', JSON.stringify(date),{headers: headers})
      .map((data : Response) => {
        return data
          .json().results 
      })
      .catch(this.handleError);
}

getHistoryLevel2(date:any) {
    const body = JSON.stringify(date);
    const headers = new Headers();
    console.log(date)
    headers.append('token', this.authservice.getLoggedInUser().token);
 headers.append('Content-Type', 'application/json');
    return this
      .http
      .post(this.config.apiEndpoint + '/deposit/categoryHistoryLevel2', JSON.stringify(date),{headers: headers})
      .map((data : Response) => {
        return data
          .json().results 
      })
      .catch(this.handleError);
}

  private handleError(error : any) {
    console.error('Erro:', error);
    return Observable.throw(error);
  }

}