import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HojarutaService } from '../../services/hojaruta.service';
import { Hojaruta } from '../../models/hojaruta';
import { SeguimientoService } from '../../services/seguimiento.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  seguim: any = [];
  rutas: any = [];
  idhr:string="";
  public identity: any ;
  public hojas: any = [];
  public hoja: any = [];
  loading: boolean = true;
  idh: string = "";
  today = new Date();
  estadoreg: string = "REGISTRADO";
  estadorec: string = "RECIBIDO";
  estadoenv: string = 'ENVIADO';
  public search: string="";
  pageActual: number = 1;
  constructor(
    private router: Router,
    private _hojaService: HojarutaService,
    private _seguiService: SeguimientoService,
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
                this.router.navigate(['/hoja-ruta/listhr']);
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
