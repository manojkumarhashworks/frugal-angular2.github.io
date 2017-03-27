import {Injectable, Inject} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Rx';
import {Router} from '@angular/router';
import {APP_CONFIG, IAppConfig} from '../app.config';

@Injectable()

export class paymentRecievedService {

  constructor(private http : Http, private router : Router, @Inject(APP_CONFIG)private config : IAppConfig) {}

  gettlrGraph(date : any) {
    const body = JSON.stringify(date);
    const headers = new Headers();
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

  private handleError(error : any) {
    console.error('Erro:', error);
    return Observable.throw(error);
  }

}