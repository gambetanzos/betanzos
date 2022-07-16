import { Component, OnInit, ViewChild } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { HojarutaService } from '../../services/hojaruta.service';
import { SeguimientoService } from '../../services/seguimiento.service';
import { Hojaruta } from '../../models/hojaruta';
import { Segui } from '../../models/seguimiento';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public hojas: Hojaruta[] = [];
  public hoja: any = [];
  public seguis: Segui[] = [];
  cant: string = "";
  canten:number = 0;
  cantre:number = 0;
  cantrec:number = 0;
  cantpro:number = 0;
  destino: string="";
  cantderp:number = 0;
  cantenp:number = 0;
  cantrecp:number = 0;
  cantfinp:number = 0;
  totalp:number = 0;
  totalarcp:number = 0;
  public identity: any = [];
  public token: any;
  constructor(
    private _hojaService: HojarutaService,
    private _seguiService: SeguimientoService,
    public _authService: AuthService,
  ) { this.loadUser(); }

  ngOnInit(): void {
    this.getHojas();
    this.obtenertotal();
  }
  loadUser() {
    this.identity = JSON.parse(localStorage.getItem('identity') || '{}');

  }
  obtenertotal(){
    let RegExp = /[^()]*/g
    this.destino = this.identity.post;
    let destino1: any = RegExp.exec(this.destino);
    this._seguiService.obtenerSeguiO(destino1).subscribe(data => {
    this.seguis = data;
    this.totalp = this.seguis.length;
    this.cantrecp = this.seguis.filter(list => list.estado === 'RECIBIDO').length;
    this.cantderp = this.seguis.filter(list => list.estado === 'DERIVADO').length;
    this.cantenp = this.seguis.filter(list => list.estado === 'ENVIADO').length;
    this.cantfinp = this.seguis.filter(list => list.estado === 'MALETIN').length;
    this.totalarcp = this.seguis.filter(list => list.estado === 'ARCHIVADO').length;
   }, error => {
     console.log(error);
   })
  }
  getHojas() {
    this._hojaService.getHojas().subscribe(data => {
      this.hojas = data.serverResponse;
      this.cantre = this.hojas.filter(list => list.estado === 'REGISTRADO').length;
      this.canten = this.hojas.filter(list => list.estado === 'ENVIADO').length;
      this.cantrec = this.hojas.filter(list => list.estado === 'RECIBIDO').length;
    }, error => {
      console.log(error);
    })
  }
}
