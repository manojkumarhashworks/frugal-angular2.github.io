import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


import { Router } from '@angular/router';


@Injectable()
export class AuthService {
    public userLoggedIn: any;
    constructor(private router: Router) {
        this.isAuthenticated();
    }

 logout() {
        localStorage.clear();
        this.userLoggedIn = false;
          this.router.navigate(['/login']);
    }

  

    isAuthenticated() {

        var user = localStorage.getItem('currentUser');

        if (user !== undefined && user !== null) {
            this.userLoggedIn = true;
            return true;
        } else {
            // this.router.navigate(['/login'])
            console.log('You Need To Login To Access Home Page');
            this.userLoggedIn = false;
            return false;
        }

    }

    getLoggedInUser() {
        var user = JSON.parse(localStorage.getItem('currentUser'));
        return user;
    }
}