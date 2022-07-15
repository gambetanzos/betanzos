import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizacionService } from '../../services/organizacion.service';
import { Organizacion } from '../../models/Organizacion';

@Component({
  selector: 'app-organizacion-add',
  templateUrl: './organizacion-add.component.html',
  styleUrls: ['./organizacion-add.component.css']
})
export class OrganizacionAddComponent implements OnInit {
  public org: Organizacion[] = [];
  orgForm: FormGroup;
  titulo = 'Crear una Unidad';
  id: string | null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private _orgService: OrganizacionService,
    private aRouter: ActivatedRoute) {this.orgForm = this.fb.group({
      nombredir: ['', Validators.required],
      nombrecargo: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id'); }

  ngOnInit(): void {
    this.esEditar();
  }
  registerOrg() {
    const ORG: Organizacion = {
      nombredir: this.orgForm.get('nombredir')?.value,
      nombrecargo: this.orgForm.get('nombrecargo')?.value,

    }

    if (this.id !== null) {
      //ediar usuario
      this._orgService.EditarOrg(this.id, ORG).subscribe(data =>{
         //Alerta
         swal(
          'Unidad Editado!!',
          'La Unidad se ha editado correctamente',
          'success'
        );
        this.router.navigate(['/hoja-ruta/organizacion']);
      }, error => {
        //Alerta
        swal(
          'Edición fallida!!',
          'La Unidad no se ha modificado correctamente',
          'error'
        );
        console.log(error);
        this.orgForm.reset();
      })
    } else {
      //agregar usuario
      console.log(ORG);
      this._orgService.register(ORG).subscribe(data => {
        //Alerta
        swal(
          'Unidad Creado!!',
          'La Unidad se ha creado correctamente',
          'success'
        );
        this.router.navigate(['/hoja-ruta/organizacion']);
      }, error => {
        console.log(error);
        this.orgForm.reset();
      })
    }
  }
  esEditar() {

    if (this.id !== null) {
      this.titulo = 'Editar Org';
      this._orgService.obtenerOrgs(this.id).subscribe(data => {
        console.log(data)
        this.orgForm.setValue({
          nombredir: data.nombredir,
          nombrecargo: data.nombrecargo,
        })

      }, error => {
        console.log("no hay id" + error);
      })
    }
  }

}
