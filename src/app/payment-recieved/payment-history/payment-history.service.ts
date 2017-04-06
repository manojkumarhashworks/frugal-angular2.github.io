import { AuthService } from '../../core/auth.service';
import {Injectable, Inject} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Rx';
import {Router} from '@angular/router';
import {APP_CONFIG, IAppConfig} from '../../app.config';

@Injectable()

export class PaymentRecievedHistoryService {

constructor(private http : Http, private router : Router, @Inject(APP_CONFIG)private config : IAppConfig,private authservice:AuthService) {}


getPaymentHistoryDetails (date:any) {
     const body = JSON.stringify(date);
    const headers = new Headers();
    headers.append('token', this.authservice.getLoggedInUser().token);
 headers.append('Content-Type', 'application/json');
 return this.http.post(this.config.apiEndpoint + '/deposit/getPaymentReceivedDetails',body,{headers:headers})
 .map((data: Response) => {
        return data.json().results[0];

 })
}


}