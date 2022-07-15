import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import swal from 'sweetalert';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { Organizacion } from '../../models/Organizacion';
import { OrganizacionService } from '../../services/organizacion.service';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {
  subscription: Subscription = new Subscription;
  params: string = "";
  public identity: any ;
  orgselec: any []=[] ;
  public org: Organizacion[] = [];
  public users: User[] = [];
  userForm: FormGroup;
  titulo = 'Crear Usuario';
  id: string | null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    private _usuarioService: UsuarioService,
    private _orgService: OrganizacionService,
    private aRouter: ActivatedRoute) {
      this.userForm = this.fb.group({
        username: ['', Validators.required],
        surnames: ['', Validators.required],
        ci: ['', Validators.required],
        email: ['', Validators.required],
        numberphone: [''],
        password: ['', Validators.required],
        post: ['', Validators.required],
      })
      this.id = this.aRouter.snapshot.paramMap.get('id');
      this.loadUser();
    }

  ngOnInit(): void {
    this.getOrga();
    this.esEditar();
    this.getSub();
  }
  loadUser(){
    this.identity = JSON.parse(localStorage.getItem('identity')|| '{}');
   // this.token = JSON.parse(localStorage.getItem('token')|| '{}');

  }
  registerUser() {
    const USER: User = {
      username: this.userForm.get('username')?.value,
      surnames: this.userForm.get('surnames')?.value,
      ci: this.userForm.get('ci')?.value,
      email: this.userForm.get('email')?.value,
      numberphone: this.userForm.get('numberphone')?.value,
      password: this.userForm.get('password')?.value,
      birthdate: this.userForm.get('birthdate')?.value,
      post: this.userForm.get('post')?.value,
    }

    if (this.id !== null) {
      //ediar usuario
      console.log(USER);
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
      console.log(USER);
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
      this.titulo = 'Editar producto';
      this._usuarioService.obtenerUser(this.id).subscribe(data => {
        console.log(data)
        this.userForm.setValue({
          username: data.username,
          surnames: data.surnames,
          ci: data.ci,
          email: data.email,
          numberphone: null,
          password: data.password,
          birthdate: data.birthdate,
          post: data.post,
        })
      }, error => {
        console.log("no hay id" + error);
      })
    }
  }
  getOrga(){
    this.subscription = this._orgService.getOrg().subscribe(data => {
      console.log(data);
      this.org = data;
    }, error => {
      console.log(error);
    })
  }
  getSub() {

    if (this.params !== null) {
      this.subscription =  this._orgService.obtenerOrg(this.params).subscribe(data => {
        this.orgselec = data.subdirecciones;

      }, error => {
        console.log(error);
      })
    }
  }
}
