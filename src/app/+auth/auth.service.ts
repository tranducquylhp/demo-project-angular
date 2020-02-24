import { HttpClientProvider } from './../shared/httpclientprovider/http-client-provider';
import { SystemUser } from './model/systemuser';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
  public isLoggedIn: boolean = false;
  public user: SystemUser;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(public router: Router, private http: HttpClientProvider) { }

  public login(model): Observable<SystemUser> {
    return this.http.post(`/auth/login`, model);
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}

