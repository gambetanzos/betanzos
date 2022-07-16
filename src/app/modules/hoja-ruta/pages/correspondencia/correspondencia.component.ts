import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SeguimientoService } from '../../services/seguimiento.service';
import { HojarutaService } from '../../services/hojaruta.service';
import { Segui } from '../../models/seguimiento';

@Component({
  selector: 'app-correspondencia',
  templateUrl: './correspondencia.component.html',
  styleUrls: ['./correspondencia.component.css']
})
export class CorrespondenciaComponent implements OnInit {
  subscription: Subscription = new Subscription;
  public seguis: Segui[] = [];
  segui: any = [];
  filterSeg: any = ""
  loading: boolean=true;
  hoja: any = [];
  res: any = {};
  seguiss: any = [];
  ruta: any[] = [];
  today = new Date();
  estadorec: string = "RECIBIDO";
  estadofin: string = "MALETIN";
  ids: string = "";
  nuithr:string="";
  destino: string="";
  pageActual: number = 1;
  cantder:number = 0;
  canten:number = 0;
  cantrec:number = 0;
  cantfin:number = 0;
  total:number = 0;
  totalarc:number = 0;
  canaso:number = 0;
  public identity: any = [];
  public token: any;
  radioButtonSeleccionado = 'RECIBIDO';

  constructor(private fb: FormBuilder,
    private router: Router,
    private _seguiService: SeguimientoService,
    private _hojaService: HojarutaService,
    public _authService: AuthService,
    private aRouter: ActivatedRoute) {
      this.loadUser();
      this.loading = false;
     }

  ngOnInit(): void {
    this.getSegui();
    this.getHoja();
    this.getSeguiO();
    this.obtenertotal();
  }
  loadUser() {
    this.identity = JSON.parse(localStorage.getItem('identity') || '{}');

  }
  getSegui() {
    this._seguiService.getsegui().subscribe(data => {
      //this.segui = data;
    }, error => {
      console.log(error);
    })
  }
  getSeguiO(){
    this.loading = true;
     let RegExp = /[^()]*/g
     this.destino = this.identity.post;
     let destino1: any = RegExp.exec(this.destino);
     this._seguiService.obtenerSeguiO(destino1).subscribe(data => {
      this.loading = false;
     this.segui = data;
    }, error => {
      console.log(error);
    })
  }
  getHoja() {
    this._hojaService.getHojas().subscribe(data => {
      this.hoja = data.serverResponse;
    }, error => {
      console.log(error);
    })
  }

  obtenertotal(){
    this.loading = true;
    let RegExp = /[^()]*/g
    this.destino = this.identity.post;
    let destino1: any = RegExp.exec(this.destino);
    this._seguiService.obtenerSeguiO(destino1).subscribe(data => {
      this.loading = false;
    this.seguis = data;
    this.total = this.seguis.length;
    this.cantrec = this.seguis.filter(list => list.estado === 'RECIBIDO').length;
    this.cantder = this.seguis.filter(list => list.estado === 'DERIVADO').length;
    this.canten = this.seguis.filter(list => list.estado === 'ENVIADO').length;
    this.cantfin = this.seguis.filter(list => list.estado === 'MALETIN').length;
    this.totalarc = this.seguis.filter(list => list.estado === 'ARCHIVADO').length;
   }, error => {
     console.log(error);
   })
  }
  cambiarestado(id: any) {
    const SEGUI: Segui = {
      fecharecepcion: this.today,
      estado: this.estadorec,
    }
    this._seguiService.obtenerSegui(id).subscribe(data => {
      this.seguiss = data;
      this.ids = this.seguiss._id;
      if (this.seguiss.fecharecepcion === "SIN RESEPCIONAR") {
        this._seguiService.EditarSeguis(this.ids, SEGUI).subscribe(data => {
          this.router.navigate(['/correspondencia']);

          this.getSeguiO();
          this.obtenertotal();
        }, error => {
          console.log(error);
        })
      }
    }, error => {
      console.log(error);
    })
  }
  finalizar(id: any) {
    this._seguiService.obtenerSegui(id).subscribe(data => {
      this.seguiss = data;
      this.ids = this.seguiss._id;

    const SEGUI: Segui = {
      estado: this.estadofin,
    }
    if (this.seguiss.estado === "RECIBIDO") {
    swal({
      title: "¿Estás seguro finalizar???",
      text: "Esta seguro de finalizar el trámite?????????",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
              this._seguiService.EditarSeguis(this.ids, SEGUI).subscribe(data => {
                swal("El tramite fue finalizado", {
                  icon: "success",
                });
                console.log(SEGUI);
                this.router.navigate(['/correspondencia']);

                this.getSeguiO();
                this.obtenertotal();
              }, error => {
                console.log(error);
              })
        } else {
          swal("Ha cancelado la finalizacion del tramite");
        }
      });
    }
    }, error => {
      console.log(error);
    })
  }
  reactivar(id: any) {
    this._seguiService.obtenerSegui(id).subscribe(data => {
      this.seguiss = data;
      this.ids = this.seguiss._id;

    const SEGUI: Segui = {
      estado: this.estadorec,
    }
    if (this.seguiss.estado === "MALETIN") {
    swal({
      title: "¿Estás seguro Reactivar????",
      text: "Esta seguro de reactivar el trámite?????????",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
              this._seguiService.EditarSeguis(this.ids, SEGUI).subscribe(data => {
                swal("El tramite fue finalizado", {
                  icon: "success",
                });
                console.log(SEGUI);
                this.router.navigate(['/correspondencia']);

                this.getSeguiO();
                this.obtenertotal();
              }, error => {
                console.log(error);
              })
        } else {
          swal("Ha cancelado la finalizacion del tramite");
        }
      });
    }
    }, error => {
      console.log(error);
    })
  }

}
