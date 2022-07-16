import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HojarutaService } from '../../services/hojaruta.service';
@Component({
  selector: 'app-print-hr',
  templateUrl: './print-hr.component.html',
  styleUrls: ['./print-hr.component.css']
})
export class PrintHrComponent implements OnInit {
  subscription: Subscription = new Subscription;
  ruta: any = [];
  titulo = 'Crear una Unidad';
  id: string | null;
  constructor(private fb: FormBuilder,
    private router: Router,
    private _hojaService: HojarutaService,
    private aRouter: ActivatedRoute) {
      this.id = this.aRouter.snapshot.paramMap.get('id');
    }

  ngOnInit(): void {
    this.esEditar();
  }
  esEditar() {

    if (this.id !== null) {
      this.titulo = 'Editar Org';
      this.subscription = this._hojaService.obtenerHoja(this.id).subscribe(data => {
        this.ruta=data.serverResponse;
      }, error => {
        console.log("no hay id" + error);
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
