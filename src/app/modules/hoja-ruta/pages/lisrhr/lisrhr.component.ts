import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HojarutaService } from '../../services/hojaruta.service';
import { Hojaruta } from '../../models/hojaruta';

@Component({
  selector: 'app-lisrhr',
  templateUrl: './lisrhr.component.html',
  styleUrls: ['./lisrhr.component.css']
})
export class LisrhrComponent implements OnInit {
  //mostrar aso
  aso: any = [];
  asonuit: any = {};
  lisaso: string = " ";
  public identity: any;
  public hojas: any = [];
  public hoja: any = [];
  loading: boolean = true;
  filterhoja: any = ""
  idh: string = "";
  cant: number = 0;
  canten: number = 0;
  estadoreg: string = "REGISTRADO";
  estadorec: string = "RECIBIDO";
  estadoenv: string = 'ENVIADO';
  pageActual: number = 1;

  constructor(public _authService: AuthService,
    private _hojaService: HojarutaService,
    private router: Router
  ) {

      this.loadUser();
      this.loading = false;

  }

  ngOnInit(): void {
    this.getHojas();
  }
  loadUser() {
    this.identity = JSON.parse(localStorage.getItem('identity') || '{}');
    // this.token = JSON.parse(localStorage.getItem('token')|| '{}');
  }
  getHoja(id: any) {
    this.loading = true;
    this._hojaService.obtenerHoja(id).subscribe(data => {
      this.loading = false;
      this.hoja = data;
      this.cant = this.hoja.asociado.length
    }, error => {
      this.loading = false;
      console.log(error);
    })
  }
  getHojas() {
    this.loading = true;
    this._hojaService.getHojas().subscribe(data => {
      this.loading = false;
      this.hojas = data.serverResponse;
    }, error => {
      this.loading = false;
      console.log(error);
    })
  }
  eliminarHoja(id: any) {
    //Alerta
    swal({
      title: "¿Estás seguro?",
      text: "Una vez borrado no podrás recuperarlo!",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
          this._hojaService.eliminarHoja(id).subscribe(
            data => {
              swal("La Unidad ha sido borrado!", {
                icon: "success",
              });
              this.getHojas();
            },
            error => {
              console.log(error);
            }
          );

        } else {
          swal("Tranquilo, nada se ha borrado!");
        }
      });
  }
  listaso(id: any) {
    this._hojaService.obtenerHoja(id).subscribe(data => {
      this.aso = data.serverResponse.asociado
      for (let i = 0; i < this.aso.length; i++) {
        this.asonuit = this.aso[i];
        this.lisaso = this.lisaso + this.asonuit.nuit + " | "
      }
      swal({
        text: "Al N°"+" "+this.asonuit.nuit,
        title: "ASOCOADO N°"+" "+this.lisaso,
        buttons:["Volver", "Ir a Ver"],
      })
      .then((enviar) => {
        if (enviar) {
          this.router.navigate(['hoja-ruta/list-asociar',id]);
        }
      });
      this.lisaso = ""
    }, error => {
      console.log(error);
    })
  }
  cambiarestado(id: any) {
    this._hojaService.obtenerHoja(id).subscribe(data => {
      this.hoja = data.serverResponse;
      this.idh = this.hoja._id;

      const HOJA: Hojaruta = {
        estado: this.estadorec,
      }
      if (this.hoja.estado === "REGISTRADO") {
        swal({
          title: "¿Estás seguro Recibir???",
          text: "Esta seguro de recibir el trámite?????????",
          icon: "warning",
          buttons: [true, true],
          dangerMode: true
        })
          .then((willDelete) => {
            if (willDelete) {
              this._hojaService.EditarHoja(this.idh, HOJA).subscribe(data => {
                swal("El tramite fue recibido", {
                  icon: "success",
                });
                console.log(HOJA);
                this.router.navigate(['/hoja-ruta/listhr']);

                this.getHojas();
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
