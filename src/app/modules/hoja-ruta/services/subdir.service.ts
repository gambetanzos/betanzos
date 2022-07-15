import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { Organizacion } from '../models/Organizacion';
import { Subdir } from '../models/subdir';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class SubdirService {
  public URL: string;

  constructor(
    private _http: HttpClient
  ) {  this.URL=Global.url;
  }
  register(org: Organizacion): Observable<any> {
    return this._http.post(this.URL + 'org', org);
  }
  getSub():Observable<any>{
    return this._http.get(this.URL+'subdir');
  }
  obtenerOrg(id: string): Observable<any> {
    return this._http.get(this.URL + 'orgs/' + id);
  }
  eliminarSubDir(id: string): Observable<any> {
    return this._http.delete(this.URL + 'subdir/' + id);
  }
  EditarOrg(id: string, sub:Subdir): Observable<any> {
    return this._http.put(this.URL + 'subdir/' + id, sub);
  }
}
