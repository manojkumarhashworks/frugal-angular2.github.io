
import { Injectable, Inject } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { APP_CONFIG, IAppConfig } from '../app.config';





@Injectable()

export class paymentRecievedService {

      constructor(private http: Http, private router: Router, @Inject(APP_CONFIG) private config: IAppConfig) {

 }

 gettlrGraph(startDate,endDate) {
       const body = JSON.stringify(startDate,endDate);
       
    return this.http.post(this.config.apiEndpoint + '/deposit/getTlrGraphDetails', JSON.stringify(startDate,endDate))
      .map((data: Response) => {
        return data.json();
      })
      .catch(this.handleError);
 }
 
 getPaymentReceivedList(date:any) {
    const body = JSON.stringify(date);
  
    return this.http.post(this.config.apiEndpoint + '/deposit/getPaymentReceivedList', JSON.stringify(date))
      .map((data: Response) => {
        return data.json();
      })
      .catch(this.handleError);
 }

private handleError(error: any) {
    console.error('Erro:', error);
    return Observable.throw(error);
  }

}