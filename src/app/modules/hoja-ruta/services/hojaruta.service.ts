import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Global } from './global';
import { Hojaruta } from '../models/hojaruta';
@Injectable({
  providedIn: 'root'
})
export class HojarutaService {
  public URL: string;
  fecharesepcion: any;
  nuit: any;
  constructor(
    private _http: HttpClient
  ) {
    this.URL=Global.url;
   }

   register(hoja: Hojaruta): Observable<any> {
    return this._http.post(this.URL + 'hoja', hoja);
  }

  getHojas(limit?:number, page?:any):Observable<any>{
    let dir = `${this.URL}hojas/${limit}/${page}`
    return this._http.get(dir);
  }

  obtenerHoja(id: string): Observable<any> {
    return this._http.get(this.URL + 'hoja/' + id);
  }

  eliminarHoja(id: string): Observable<any> {
    return this._http.delete(this.URL + 'hoja/' + id);
  }
  EditarHoja(id: string, hoja:Hojaruta): Observable<any> {
    return this._http.put(this.URL + 'hoja/' + id, hoja);
  }
  buscarHoja(search: string): Observable<any> {
    return this._http.get(this.URL + 'hojasearch/' + search);
  }
  Asociar(nuit: string, hoja:Hojaruta): Observable<any> {
    return this._http.put(this.URL + 'asociar/' + nuit, hoja);
  }
  busacrnuit(nuit: string): Observable<any> {
    return this._http.get(this.URL + 'asociar/' + nuit);
  }
}
