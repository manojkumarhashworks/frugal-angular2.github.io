import {Injectable, Inject} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Rx';
import {Router} from '@angular/router';
import {APP_CONFIG, IAppConfig} from '../app.config';

@Injectable()

export class LoginService {

  constructor(private http : Http, private router : Router, @Inject(APP_CONFIG)private config : IAppConfig) {}
  public token: string;

  loginUser(login) {
        localStorage.clear();
    const body = JSON.stringify(login);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
  
    return this.http.post('http://192.168.1.21:8010/api/users/userAuthentication', JSON.stringify(login), { headers: headers })
      //    .map((data:Response) => data.json())

      .map((data: Response) => {
          debugger
        // login successful if there's a jwt token in the response
        let token = data.json().token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ token: data.json().token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      })
      .catch(this.handleError);
    // .toPromise()
    // .then(response => response.json())
    // .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('Erro:', error);
    return Observable.throw(error);
  }


}