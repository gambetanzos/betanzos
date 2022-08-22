import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { identity, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SeguimientoService } from '../../services/seguimiento.service';
import { HojarutaService } from '../../services/hojaruta.service';
import { UsuarioService } from '../../services/usuario.service';
import { Segui } from '../../models/seguimiento';
import * as moment from 'moment';

@Component({
  selector: 'app-correspondencia',
  templateUrl: './correspondencia.component.html',
  styleUrls: ['./correspondencia.component.css']
})
export class CorrespondenciaComponent implements OnInit {
  seguim: any = [];
  rutas: any = [];
  idhr:string="";
  //archivar
  ale:any={};
  alerta:boolean=false
  nombreus:string="";
  sms: string = "";
  datito:any=null;
  user:any={};
  //mostrar aso
  aso: any = [];
  asonuit: any = {};
  lisaso: string = " ";
  //-------------reply
  nuitre: any = [];
  nuitreply: string = "";
  seguireply: any = [];
  res: any = {};
  idreply: number = 0;
  mostrarError: boolean;
  textError: string;
  //-------
  params: any = [];
  seguiaso: any = [];
  subscription: Subscription = new Subscription;
  public seguis: Segui[] = [];
  segui: any = [];
  filterSeg: any = ""
  loading: boolean = true;
  hoja: any = [];

  seguiss: any = [];
  ruta: any[] = [];
  today = new Date();
  hoy= moment();
  estadorec: string = "RECIBIDO";
  recibido: string = " "
  estadofin: string = "MALETIN";
  ids: string = "";
  nuithr: string = "";
  destino: string = "";
  pageActual: number = 1;
  cantder: number = 0;
  canten: number = 0;
  cantrec: number = 0;
  cantfin: number = 0;
  total: number = 0;
  totalarc: number = 0;
  canaso: number = 0;
  public identity: any = [];
  public token: any;
  radioButtonSeleccionado = 'RECIBIDO';

  constructor(private fb: FormBuilder,
    private router: Router,
    private _seguiService: SeguimientoService,
    private _hojaService: HojarutaService,
    private _userSevice: UsuarioService,
    public _authService: AuthService,
    private aRouter: ActivatedRoute) {
    this.loadUser();
    this.loading = false;
    this.mostrarError = false;
    this.textError = '';
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
  getSeguiO() {
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

  obtenertotal() {
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
      if(this.canten>0){
        for(let i=0 ; i < this.seguis.length ; i ++){
          this.ale=this.seguis[i]
          if(this.ale.estado==="ENVIADO" && (this.hoy.diff(this.ale.fechaderivado, 'd') > 1)){
            this.alerta=true;
          }
        }
      }
    }, error => {
      console.log(error);
    })
  }
  cambiarestado(id: any) {
    const SEGUI: Segui = {
      fecharecepcion: this.today,
      estado: this.estadorec,
      recibidox: this.identity.username + " " + this.identity.surnames
    }
    this._seguiService.obtenerSegui(id).subscribe(data => {
      this.seguiss = data;
      this.ids = this.seguiss._id;
      if (this.seguiss.fecharecepcion === "SIN RESEPCIONAR") {
        this._seguiService.EditarSeguis(this.ids, SEGUI).subscribe(data => {
          this.router.navigate(['hoja-ruta/correspondencia']);

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
  listaso(id: any) {
    this._hojaService.obtenerHoja(id).subscribe(data => {
      this.aso = data.serverResponse.asociado
      for (let i = 0; i < this.aso.length; i++) {
        this.asonuit = this.aso[i];
        this.lisaso = this.lisaso + this.asonuit.nuit + " | "
      }
      swal({
        //text: "Al N°"+" "+this.aso.nuit,
        title: "ASOCOADO N°"+" "+this.lisaso,
        buttons: ["Volver", "Ir a Ver"]
      })
        .then((enviar) => {
          if (enviar) {
            this.router.navigate(['hoja-ruta/list-asociar', id]);
          }
        });
      this.lisaso = ""
    }, error => {
      console.log(error);
    })
  }
  ver(id: any) {
    const SEGUI: Segui = {
      fecharecepcion: this.today,
      estado: this.estadorec,
      recibidox: this.identity.username + " " + this.identity.surnames
    }
    this._seguiService.obtenerSegui(id).subscribe(data => {
      this.seguireply = data;
      console.log(this.seguireply)
      this.nuitreply = this.seguireply.nuit;
      this._seguiService.buscarnuit(this.nuitreply).subscribe(data => {
        this.nuitre = data;
        for (let i = 0; i < this.nuitre.length; i++) {
          if (i===this.nuitre.length-2) {
            this.res = this.nuitre[i];
            this._userSevice.obtenerUserpost(this.res.destino).subscribe(data =>{
              this.user=data.serverResponse
              this.nombreus=this.user.username + " " + this.user.surnames
              swal({
                text: "A cargo de: "+" "+this.nombreus+"................................   "+ "Origen: "+ this.seguireply.origenhr+"....................................         "+ " Referencia: "+ this.seguireply.referencia,
                title: this.res.destino,
                buttons: ["Volver", "Recibir"]
              })
                .then((willDelete) => {
                  if (willDelete) {
                    this._seguiService.EditarSeguis(id, SEGUI).subscribe(data => {
                      this.router.navigate(['hoja-ruta/correspondencia']);
                      this.getSeguiO();
                      this.obtenertotal();

                    }, error => {
                      console.log(error);
                    })
                  }
                 // this.nombreus=""
                });
            }, error => {
              console.log(error)
            })
          }
        }
      }, error => {
        console.log(error)
      })
    }, error => {
      console.log(error);
    })
  }
  finalizar(id: any) {
    swal({
      title: "¿Estás seguro archivar en tu MALETIN?",
      icon: "warning",
      text: "Debe insertar el motivo o detalle del envio a tu maletin...",
      content: {
        element: "input",
      },
      buttons: ["Cancelar", "Enviar"]
    })
      .then((value) => {
        this.sms=value
        const SEGUI: Segui = {
          estado: this.estadofin,
          smsarchivo:this.sms,
          fecharespuesta:this.today
        }
        if (value) {
          this._seguiService.EditarSeguis(id, SEGUI).subscribe(data => {
            swal("El tramite fue finalizado", {
              icon: "success",
            });
            this.router.navigate(['hoja-ruta/correspondencia']);
            this.getSeguiO();
            this.obtenertotal();
          }, error => {
            console.log(error);
          })
        } else {
          swal("Ha cancelado la Pre-finalizado del tramite o debe escribir el texto");
        }
      });

  }
  reactivar(id: any) {
      const SEGUI: Segui = {
        estado: this.estadorec,
        fecharespuesta:this.datito
      }
        swal({
          title: "¿Estás seguro Reactivar?",
          text: "Esta seguro de reactivar el trámite?",
          icon: "warning",
          buttons: ["Cancelar", "SI"],
          dangerMode: true
        })
          .then((willDelete) => {
            if (willDelete) {
              this._seguiService.EditarSeguis(id, SEGUI).subscribe(data => {
                swal("El tramite fue reactivado", {
                  icon: "success",
                });
                this.router.navigate(['hoja-ruta/correspondencia']);
                this.getSeguiO();
                this.obtenertotal();
              }, error => {
                console.log(error);
              })
            } else {
              swal("Ha cancelado la reacivacion del tramite");
            }
          });
          console.log(this.datito)
  }
  reply(id: any) {
    const SEGUID: Segui = {
      estado: this.estadorec,
      fecharespuesta:this.datito
    }
    this._seguiService.obtenerSegui(id).subscribe(data => {
      this.seguireply = data;
      this.nuitreply = this.seguireply.nuit;
      this._seguiService.buscarnuit(this.nuitreply).subscribe(data => {
        this.nuitre = data;
        for (let i = 0; i < this.nuitre.length; i++) {
          this.res = this.nuitre[i];
          if (this.res._id === id) {
            this.idreply = i + 2
          }
          if (this.res.estado === "ENVIADO" && this.idreply === this.nuitre.length) {

            swal({
              title: "¿Estás seguro cancelar?",
              text: "Esta seguro eliminar lo que has derivado?",
              icon: "warning",
              buttons: ["Cancelar", "SI"],
              dangerMode: true
            })
              .then((willDelete) => {
                if (willDelete) {
                  this._seguiService.eliminarSegui(this.res._id).subscribe(data => {

                  }, error => {
                    console.log(error);
                  }
                  )
                  this._seguiService.EditarSeguis(id, SEGUID).subscribe(data => {

                  }, error => {
                    console.log(error);
                  })
                  swal("El tramite se ha restauradado al ultimo accion", {
                    icon: "success",
                  });
                  this.getSeguiO();
                  this.obtenertotal();
                } else {
                  swal("Ha cancelado el proceso");
                }
              });
          } else {
            swal("Ya fue recibido la derivación motivo que no se puede realizar este acción")
          }
        }

      }, error => {
        console.log(error)
      })
    }, error => {
      console.log(error);
    })
  }
  error(valor: string) {
    this.mostrarError = true;
    this.textError = valor;

    // Mostramos error por 4 segundos
    setTimeout(() => {
      this.mostrarError = false;
    }, 3000);
  }
  seguimi(idh: any) {
      this.loading = true;
      this.idhr=idh
      this._hojaService.obtenerHoja(idh).subscribe(data => {
        this.loading = false;
        this.rutas = data.serverResponse;
        this._seguiService.buscarnuit(this.rutas.nuit).subscribe(data => {
          this.seguim = data;
        }, error => {
          console.log(error);
        })
      }, error => {
        console.log(error);
      })
  }

  ImprimirPDF() {
    const DATA: any = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'letter');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 3;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {

      docResult.output('dataurlnewwindow', { filename: 'comprobante.pdf' });
      //docResult.save(`${new Date().toISOString()}_HojaDeRuta.pdf`);
    });
  }

  ///Descargar

  downloadPDF() {
    const DATA: any = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'letter');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 4;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {

      //docResult.output('dataurlnewwindow', {filename: 'comprobante.pdf'});
      docResult.save(`${new Date().toISOString()}_GAMB_HojaDeRuta.pdf`);
    });


  }
}
