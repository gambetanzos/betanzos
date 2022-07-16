import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HojarutaService } from '../../services/hojaruta.service';
import { Hojaruta } from '../../models/hojaruta';
import { Global } from '../../services/global';

@Component({
  selector: 'app-add-files',
  templateUrl: './add-files.component.html',
  styleUrls: ['./add-files.component.css']
})
export class AddFilesComponent implements OnInit {
  public afuConfig: any;
  public hoja: any = [];
  hojaForm: FormGroup;
  titulo = 'ADJUNTAR ARCHIVO';
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _hojaService: HojarutaService,
    private aRouter: ActivatedRoute
  ) {
    this.hojaForm = this.fb.group({
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');

    this.afuConfig = {
      multiple: true,
      formatsAllowed: ".jpg,.png, .gif, .jpeg, .pdf",
      //maxSize: "50",
      uploadAPI: {
        url: Global.url + 'uploadhojaruta/'+ this.id
      },
      theme: "attachPin",
      hideProgressBar: true,
      hideResetBtn: true,
      hideSelectBtn: false,
      fileNameIndex: true,
      replaceTexts: {
        selectFileBtn: 'Select Files',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Sube tu archivo',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !',
        sizeLimit: 'Size Limit'
      }
    };
  }

  ngOnInit(): void {
    this.esEditar();
    this.getHojas();
  }
  registerHojas() {
    const HOJA: Hojaruta = {

    }
    if (this.id !== null) {
      //ediar usuario
      console.log(HOJA);
      this._hojaService.EditarHoja(this.id, HOJA).subscribe(data => {
        this.router.navigate(['/hoja-ruta/listhr']);
      }, error => {
        console.log(error);
        this.hojaForm.reset();
      })
    }
  }
  esEditar() {
    if (this.id !== null) {
      this.titulo = 'ADJUNTAR ARCHIVO';
      this._hojaService.obtenerHoja(this.id).subscribe(data => {
        this.hoja=data.serverResponse
        this.hojaForm.setValue({
          origen: data.serverResponse.origen,
          tipodoc: data.serverResponse.tipodoc,
          referencia: data.serverResponse.referencia,
          fechadocumento: data.serverResponse.fechadocumento,
        })

      }, error => {
        console.log("no hay id" + error);
      })
    }
  }
  getHojas() {
    this._hojaService.getHojas().subscribe(data => {
    }, error => {
      console.log(error);
    })
  }

  fileUpload(data: any) {
    //this.hoja.urihoja = data.body.image;
    //console.log(this.hoja.urihoja)
  }
}
