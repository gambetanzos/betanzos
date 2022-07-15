import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { User } from '../../models/user';
import swal from 'sweetalert';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  public identity: any ;
  roles: any = [];
  titulo = 'Crear Usuario';
  params: string = "";
  id: string | null;
  userForm: FormGroup;
  constructor(
    private _usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute
  ) { this.userForm = this.fb.group({
    roles: ['', Validators.required],
  })
  this.id = this.aRouter.snapshot.paramMap.get('id');
  this.loadUser(); }

  ngOnInit(): void {
    this.esEditar()
    this.getroles()
  }

  loadUser(){
    this.identity = JSON.parse(localStorage.getItem('identity')|| '{}');
   // this.token = JSON.parse(localStorage.getItem('token')|| '{}');

  }
  registerUser() {
    const USER: User = {
      roles: this.userForm.get('roles')?.value,
    }

    if (this.id !== null) {
      //ediar usuario
      //console.log(USER);
      this._usuarioService.EditarUser(this.id, USER).subscribe(data =>{
         //Alerta
         swal(
          'Usuario Editado!!',
          'El usuario se ha editado correctamente',
          'success'
        );
        this.router.navigate(['/hoja-ruta/usuarios']);
      }, error => {
        //Alerta
        swal(
          'Edición fallida!!',
          'El Usuario no se ha modificado correctamente',
          'error'
        );
        console.log(error);
        this.userForm.reset();
      })
    } else {
      //agregar usuario
      //console.log(USER);
      this._usuarioService.register(USER).subscribe(data => {
         //Alerta
         swal(
          'Usuario Creado!!',
          'El usuario se ha creado correctamente',
          'success'
        );
        this.router.navigate(['/hoja-ruta/usuarios']);
      }, error => {
        //Alerta
        swal(
          'Creacion fallida!!',
          'El Usuario no se ha creado correctamente',
          'error'
        );
        console.log(error);
        this.userForm.reset();
      })
    }
  }
  esEditar() {

    if (this.id !== null) {
      this.titulo = 'Agregar Roles';
      this._usuarioService.obtenerUser(this.id).subscribe(data => {
       // console.log(data)
        this.userForm.setValue({
          roles: data.roles,
        })
      }, error => {
        console.log("no hay id" + error);
      })
    }
  }
  getroles() {
    this._usuarioService.getroles().subscribe(data => {
      this.roles = data.serverResponse;
    }, error => {
      console.log(error);
    })

  }

}
