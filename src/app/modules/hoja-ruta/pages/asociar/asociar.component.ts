import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HojarutaService } from '../../services/hojaruta.service';
import { SeguimientoService } from '../../services/seguimiento.service';
import { Hojaruta } from '../../models/hojaruta';
import { AuthService } from '../../services/auth.service';
import { Segui } from '../../models/seguimiento';
@Component({
  selector: 'app-asociar',
  templateUrl: './asociar.component.html',
  styleUrls: ['./asociar.component.css']
})
export class AsociarComponent implements OnInit {
  public seguis: Segui[] = [];
  asociarProcesada: boolean;
  loading: boolean;
  mostrarError: boolean;
  textError: string;
  today = new Date();
  estadoaso: string = "ASOCIADO CON";
  seguiss: any = [];
  ids: string = "";
  public org: Hojaruta[] = [];
  public hoja: any = [];
  segui: any = [];
  res: any = {};
  idsegui: string = "";
  total: string = "";
  print: string = "";
  nuitA: string = "";
  nuitB: any = [];
  hojaForm: FormGroup;
  titulo = 'ASOCIAR HOJA DE RUTA';
  asociado: Boolean = true
  nuit: string | null;
  public identity: any = [];

  constructor(private fb: FormBuilder,
    private router: Router,
    private _seguiService: SeguimientoService,
    private _hojaService: HojarutaService,
    public _authService: AuthService,
    private aRouter: ActivatedRoute) {
      this.hojaForm = this.fb.group({
        nuit: ['', Validators.required]
      })
      this.nuit = this.aRouter.snapshot.paramMap.get('nuit');
      this.loadUser();
      this.asociarProcesada = false;
      this.loading = false;
      this.mostrarError = false;
      this.textError = '';
    }

  ngOnInit(): void {
  }
  loadUser() {
    this.identity = JSON.parse(localStorage.getItem('identity') || '{}');

  }
  asociar() {
    this.nuitA = this.hojaForm.get('nuit')?.value
    //--validar si el campo esta llenado
    if (this.nuitA !== null) {
      this._seguiService.buscarnuit(this.nuitA).subscribe(data => {
        this.segui = data
        if (this.segui.length > 0) {
          //--buscar numero de hoja de ruta
          for (let i = 0; i < this.segui.length; i++) {
            this.res = this.segui[i];
            if (this.res.estado === "RECIBIDO") {
              this.idsegui = this.res._id
              this._seguiService.obtenerSegui(this.idsegui).subscribe(data => {
                if (data.destino === this.identity.post) {
                  this.asociarProcesada = true
                  this._hojaService.busacrnuit(this.nuitA).subscribe(data => {
                    this.nuitB = data.serverResponse.nuit
                    if (data.serverResponse !== "nulo") {
                      this.nuitB = data.serverResponse.nuit;
                      const asocia: Hojaruta = {
                        asociado: this.nuitB
                      }
                      if (this.nuit !== null && this.nuitB == this.nuitA && this.asociarProcesada == true) {
                        this._hojaService.Asociar(this.nuit, asocia).subscribe(data => {
                          this.router.navigate(['/hoja-ruta/listhr']);
                          this.cambiarestado(this.idsegui)
                          console.log(this.res.nuit)
                          this.cambiaraso(this.res.nuit)
                        }, error => {
                          console.log({ error: "no se pudo registrar" });
                          this.hojaForm.reset();
                        })
                      }
                      this.error('los datos debe ingresar correctamente');
                      return;
                    }

                  },
                    error => {
                      this.error('no se pudo asociar ingrese los datos correctamente');
                      return;
                    })
                } this.error('el documento debe estar en su oficina con estado recibido');
                return;
              })
            }

          }
        } else {
          this.error('los parametros no son requeridos');
          return;
        }
        this.error('el documento debe estar en su oficina con estado recibido');
                return;
      })
    } else {
      this.error('hubo un error');
      return;
    }
  }
  error(valor: string) {
    this.mostrarError = true;
    this.textError = valor;

    // Mostramos error por 4 segundos
    setTimeout(() => {
      this.mostrarError = false;
    }, 4000);
  }
  cambiarestado(id: any) {
    const SEGUI: Segui = {
      estado: this.estadoaso +" "+ this.nuit,
    }
    console.log(id)
    this._seguiService.obtenerSegui(id).subscribe(data => {
      this.seguiss = data;
      this.ids = this.seguiss._id;
      if (this.seguiss.estado === "RECIBIDO") {
        this._seguiService.EditarSeguis(this.ids, SEGUI).subscribe(data => {
        //  this.router.navigate(['/correspondencia']);

        }, error => {
          console.log(error);
        })
      }
    }, error => {
      console.log(error);
    })
  }
  cambiaraso(id: any) {
    const SEGUI: Segui = {
      asociado: this.asociado
    }
    this._seguiService.EditarSeguiaso(id,SEGUI).subscribe(data=>{
      console.log("se modifico a true")
    }, error => {
      console.log(error);
    })
  }

}
