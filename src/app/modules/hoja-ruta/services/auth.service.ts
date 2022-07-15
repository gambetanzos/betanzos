import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public URL: string;
  //public identity: string | null;

  constructor(private http: HttpClient, private router: Router) {
    this.URL=Global.url;
  }

  register(user: User): Observable<any> {
    return this.http.post(this.URL + 'users', user);
  }

  login(user: {}) {
    return this.http.post<any>(this.URL + 'login', user);
  }

  loggedIn() {
    if (localStorage.getItem('token')=='undefined'){
      return !!localStorage.getItem('');
    }
    else
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('identity');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getIdentity(){
    return localStorage.getItem('identity');
  }




}
