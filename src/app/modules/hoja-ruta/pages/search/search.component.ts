import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HojarutaService } from '../../services/hojaruta.service';
import { Hojaruta } from '../../models/hojaruta';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public identity: any ;
  public hojas: any = [];
  public hoja: any = [];
  idh: string = "";
  estadoreg: string = "REGISTRADO";
  estadorec: string = "RECIBIDO";
  estadoenv: string = 'ENVIADO';
  public search: string="";
  pageActual: number = 1;
  constructor(
    private router: Router,
    private _hojaService: HojarutaService,
    private aRouter: ActivatedRoute
  ) { this.loadUser();}

  ngOnInit(): void {
    this.aRouter.params.subscribe (params => {
      var search = params['search'];
      this.search = search;
      this._hojaService.buscarHoja(this.search).subscribe(
        data => {
          if(data.serverResponse){
            this.hojas = data.serverResponse;
          }else{
            this.hojas = [];
          }
        },
        error => {
          console.log(error);
          this.hojas = [];

        }
      )
    });
  }
  loadUser(){
    this.identity = JSON.parse(localStorage.getItem('identity')|| '{}');
   // this.token = JSON.parse(localStorage.getItem('token')|| '{}');

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
      text: "Esta seguro de reciber el trámite?????????",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
              this._hojaService.EditarHoja(this.idh, HOJA).subscribe(data => {
                swal("El tramite fue finalizado", {
                  icon: "success",
                });
                console.log(HOJA);
                this.router.navigate(['/hoja-ruta']);
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


}
