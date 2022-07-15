import swal from 'sweetalert';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';import { Component, OnInit } from '@angular/core';
import { SubdirService } from '../../services/subdir.service';
import { Subdir } from '../../models/subdir';

@Component({
  selector: 'app-subdir-add',
  templateUrl: './subdir-add.component.html',
  styleUrls: ['./subdir-add.component.css']
})
export class SubdirAddComponent implements OnInit {
  public subdir: Subdir[] = [];
  subdirForm: FormGroup;
  titulo = 'Crear Sub Direccion';
  nombreSub = "";
  id: string | null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private _subdirService: SubdirService,
    private aRouter: ActivatedRoute) { this.subdirForm = this.fb.group({
      nombredir: ['', Validators.required],
      nombresubdir: ['', Validators.required],
      nombrecargosubdir: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');}

  ngOnInit(): void {
    this.esEditar();
  }
  registerSub() {
    const SUBDIR: Subdir = {
      nombredir: this.subdirForm.get('nombredir')?.value,
      nombresubdir: this.subdirForm.get('nombresubdir')?.value,
      nombrecargosubdir: this.subdirForm.get('nombrecargosubdir')?.value,

    }

    if (this.id !== null) {
      //ediar usuario
      console.log(SUBDIR);
      this._subdirService.EditarOrg(this.id, SUBDIR).subscribe(data =>{
         //Alerta
         swal(
          'Sub Unidad Creado!!',
          'La Sub Unidad se ha creado correctamente',
          'success'
        );
        this.router.navigate(['/hoja-ruta/organizacion']);
      }, error => {
        //Alerta
        swal(
          'CreacióN fallida!!',
          'La Sub Unidad no se ha crado correctamente',
          'error'
        );
        console.log(error);
        this.subdirForm.reset();
      })
    } else {
      //agregar usuario
      console.log(SUBDIR);
      this._subdirService.register(SUBDIR).subscribe(data => {
        //Alerta
        swal(
          'Sub Unidad Creado!!',
          'La Sub Unidad se ha creado correctamente',
          'success'
        );
        this.router.navigate(['/hoja-ruta/organizacion']);
      }, error => {
          //Alerta
          swal(
            'Creción fallida!!',
            'La suB Unidad no se ha creado correctamente',
            'error'
          );
        console.log(error);
        this.subdirForm.reset();
      })
    }
  }
  esEditar() {
    if (this.id !== null) {
      //this.titulo = 'Crear Sub Direccion para ';
      this._subdirService.obtenerOrg(this.id).subscribe(data => {
        console.log(data);
        this.subdirForm.setValue({
          nombredir: data.nombredir,
          nombresubdir: "",
          nombrecargosubdir:"",
        })
        this.nombreSub=data.nombredir;
        this.titulo = 'Crear Sub Direccion para '+ this.nombreSub;

      }, error => {
        console.log("no hay id" + error);
      })
    }
  }

}
