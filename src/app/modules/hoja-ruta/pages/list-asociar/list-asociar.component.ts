import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SeguimientoService } from '../../services/seguimiento.service';
import { HojarutaService } from '../../services/hojaruta.service';

@Component({
  selector: 'app-list-asociar',
  templateUrl: './list-asociar.component.html',
  styleUrls: ['./list-asociar.component.css']
})
export class ListAsociarComponent implements OnInit {
  subscription: Subscription = new Subscription;
  public identity: any ;
  id: string | null;
  titulo = 'Crear una Unidad';
  segui: any  = [];
  ruta: any = [];
  aso: any = [];
  date: Date= new(Date);
  constructor(public _authService: AuthService,
    private router: Router,
    private _seguiService: SeguimientoService,
    private _hojaService: HojarutaService,
    private aRouter: ActivatedRoute) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.loadUser();}

  ngOnInit(): void {
    this.esEditar();
    this.loadUser();
  }
  loadUser(){
    this.identity = JSON.parse(localStorage.getItem('identity')|| '{}');
   // this.token = JSON.parse(localStorage.getItem('token')|| '{}');

  }
  esEditar() {

    if (this.id !== null) {
      this.titulo = 'Editar Org';
      this.subscription= this._hojaService.obtenerHoja(this.id).subscribe(data => {
        this.ruta=data.serverResponse;
        this.aso=data.serverResponse.asociado;
      }, error => {
        console.log("no hay id" + error);
      })
      this.subscription =  this._seguiService.getsegui().subscribe(data => {
        this.segui = data;

      }, error => {
        console.log(error);
      })
    }
  }

  ImprimirPDF() {
    const DATA:any = document.getElementById('htmlData');
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
      doc.addImage(img, 'PNG',bufferX ,bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {

      docResult.output('dataurlnewwindow', {filename: 'comprobante.pdf'});
      //docResult.save(`${new Date().toISOString()}_HojaDeRuta.pdf`);
    });


  }
  recargar(id:any): void{
    this.router.navigate(['/hoja-ruta/list-asociar'],id);
    window.location.reload();
  }
refresh(){
  window.location.reload();
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
      doc.addImage(img, 'PNG',bufferX ,bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {

      //docResult.output('dataurlnewwindow', {filename: 'comprobante.pdf'});
      docResult.save(`${new Date().toISOString()}_GAMB_HojaDeRuta.pdf`);
    });


  }


}
