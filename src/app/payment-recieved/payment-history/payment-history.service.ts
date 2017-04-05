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





}