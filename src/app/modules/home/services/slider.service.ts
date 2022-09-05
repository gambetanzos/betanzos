import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Global } from '../../services/global';
import { Slider } from '../models/slider';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  public URL: string;
  constructor(
    private _http: HttpClient
  ) {
    this.URL=Global.url;
  }
  getSlider():Observable<any>{
    return this._http.get(this.URL+'slaider');
  }
  registerSlider(slider: Slider): Observable<any> {
    return this._http.post(this.URL + 'slaider', slider);
  }
}
