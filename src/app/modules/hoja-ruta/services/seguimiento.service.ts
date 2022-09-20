import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Segui } from '../models/seguimiento';
import { Observable } from 'rxjs';
import { Global } from './global';
@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {
  public URL: string;
  constructor(
    private _http: HttpClient
  ) {
    this.URL=Global.url;
  }
  register(segui: Segui): Observable<any> {
    return this._http.post(this.URL + 'segui', segui);
  }
  getsegui():Observable<any>{
    return this._http.get(this.URL+'segui');
  }
  obtenerSegui(id: string): Observable<any> {
    return this._http.get(this.URL + 'segui/' + id);
  }
  obtenerSeguiO(destino: string, limit?:number, skip?:number): Observable<any> {
    let dir = `${this.URL}seguiO/${destino}/${limit}/${skip}`
    return this._http.get(dir);
  }
  buscarnuit(nuit: string): Observable<any> {
    return this._http.get(this.URL + 'seguias/' + nuit);
  }
  eliminarSegui(id: string): Observable<any> {
    return this._http.delete(this.URL + 'segui/' + id);
  }
  EditarSegui(id: string, segui:Segui): Observable<any> {
    return this._http.put(this.URL + 'segui/' + id, segui);
  }
  EditarSeguis(id: string, segui:Segui): Observable<any> {
    return this._http.put(this.URL + 'seguis/' + id, segui);
  }
  EditarSeguiaso(nuit: string, segui:Segui): Observable<any> {
    return this._http.put(this.URL + 'seguiaso/' + nuit, segui);
  }
}
