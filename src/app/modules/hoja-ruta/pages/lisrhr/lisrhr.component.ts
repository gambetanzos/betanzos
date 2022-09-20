import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HojarutaService } from '../../services/hojaruta.service';
import { Hojaruta } from '../../models/hojaruta';
import { SeguimientoService } from '../../services/seguimiento.service';

@Component({
  selector: 'app-lisrhr',
  templateUrl: './lisrhr.component.html',
  styleUrls: ['./lisrhr.component.css']
})
export class LisrhrComponent implements OnInit {
  //paginacion
  num_pages:any=[];
  totalpage:any=0;
  page:number = 1;
  nextpage:number=0;
  prevpage:number=0;
  limit:number=10;
   //modal reguiste
   canth: string = "";
   totalh: string = "";
   ceros: string = "0";
   hojaForm: FormGroup;
   titulo = 'GENERAR HOJA DE RUTA';
  //
  seguim: any = [];
  rutas: any = [];
  idhr:string="";
  //mostrar aso
  aso: any = [];
  asonuit: any = {};
  lisaso: string = " ";
  today = new Date();
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

  constructor(private fb: FormBuilder,
    private router: Router,
    public _authService: AuthService,
    private _seguiService: SeguimientoService,
    private _hojaService: HojarutaService,
  ) {
    this.hojaForm = this.fb.group({
      origen: ['', Validators.required],
      referencia: ['', Validators.required],
      fechadocumento: ['', Validators.required],
      tipodoc: [''],
      contacto: ['']
    })

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
  registerHojas() {
    this.cant= this.cant+1
    this.totalh= this.cant+"-22";
    const HOJA: Hojaruta = {
      origen: this.hojaForm.get('origen')?.value,
      tipodoc: this.hojaForm.get('tipodoc')?.value,
      contacto: this.hojaForm.get('contacto')?.value,
      referencia: this.hojaForm.get('referencia')?.value,
      fechadocumento: this.hojaForm.get('fechadocumento')?.value,
      nuit:this.totalh
    }
    this._hojaService.register(HOJA).subscribe(data => {
      //this.router.navigate(['/hoja-ruta/listhr']);
      this.page=1;
      this.getHojas();
      this.hojaForm.reset();
    }, error => {
      console.log(error);

    })
  }
  getHoja(id: any) {
    this.loading = true;
    this._hojaService.obtenerHoja(id).subscribe(data => {
      this.loading = false;
      this.hoja = data;
      this.cant = this.hoja.asociado.length;
    }, error => {
      this.loading = false;
      console.log(error);
    })
  }
  getHojas() {
    this.loading = true;
    this._hojaService.getHojas(this.limit, this.page).subscribe(data => {
      this.hojas = data.serverResponse;
      this.cant = data.totalDocs;
      this.totalpage=data.totalpage;
      this.limit=data.limit
    }, error => {
      console.log(error);
    })
  }
  paginaAnterior() {
    this.page--;
    this.loading = true;
    this.hojas = [];
    this.getHojas();
  }

  paginaPosterior() {
    this.page++;
    this.loading = true;
    this.hojas = [];
    this.getHojas();
  }
  paginaAnteriorClass() {

    if(this.page === 1 || this.page===0) {
      return false;
    } else {
      return true;
    }
  }

  paginaPosteriorClass() {

    if(this.page === this.totalpage) {
      return false;
    } else {
      return true;
    }
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
ImprimirHRPDF() {
  const DATA: any = document.getElementById('htmlData');
  const doc = new jsPDF('p', 'pt', 'letter');
  const options = {
    background: 'white',
    scale: 3
  };
  html2canvas(DATA, options).then((canvas) => {
    const imgp = canvas.toDataURL('image/PNG');

    // Add image Canvas to PDFx
    const bufferX = 3;
    const bufferY = 15;
    const imgProps = (doc as any).getImageProperties(imgp);
    const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(imgp, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
    return doc;
  }).then((docResult) => {

    docResult.output('dataurlnewwindow', { filename: 'comprobante.pdf' });
    //docResult.save(`${new Date().toISOString()}_HojaDeRuta.pdf`);
  });
}

///Descargar

downloadHRPDF() {
  const DATA: any = document.getElementById('htmlData');
  const doc = new jsPDF('p', 'pt', 'letter');
  const options = {
    background: 'white',
    scale: 3
  };
  html2canvas(DATA, options).then((canvas) => {
    const imgp = canvas.toDataURL('image/PNG');

    // Add image Canvas to PDF
    const bufferX = 4;
    const bufferY = 15;
    const imgProps = (doc as any).getImageProperties(imgp);
    const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(imgp, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
    return doc;
  }).then((docResult) => {

    //docResult.output('dataurlnewwindow', {filename: 'comprobante.pdf'});
    docResult.save(`${new Date().toISOString()}_GAMB_HojaDeRuta.pdf`);
  });
}
}
