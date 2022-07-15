import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public URL: string;

  constructor(
    private _http: HttpClient
  ) {
    this.URL=Global.url;
   }

  register(user: User): Observable<any> {
    return this._http.post(this.URL + 'users', user);
  }

  getusers():Observable<any>{
    return this._http.get(this.URL+'users');
  }

  obtenerUser(id: string): Observable<any> {
    return this._http.get(this.URL + 'users/' + id);
  }
  obtenerUserEm(email: string): Observable<any> {
    return this._http.get(this.URL + 'user/' + email);
  }

  eliminarUsuario(id: string): Observable<any> {
    return this._http.delete(this.URL + 'users/' + id);
  }
  EditarUser(id: string, user:User): Observable<any> {
    return this._http.put(this.URL + 'users/' + id, user);
  }
  getroles():Observable<any>{
    return this._http.get(this.URL+'roles');
  }
}
