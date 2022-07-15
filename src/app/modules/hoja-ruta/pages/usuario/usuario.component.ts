import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { AuthService} from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { User } from '../../models/user';
import swal from 'sweetalert';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
public identity: any ;
  public users: User[] = [];
  constructor(
    public _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _usuarioService: UsuarioService
  ) {this.loadUser(); }

  ngOnInit(): void {
    this.getUsers();
  }
  loadUser(){
    this.identity = JSON.parse(localStorage.getItem('identity')|| '{}');
   // this.token = JSON.parse(localStorage.getItem('token')|| '{}');

  }
  getUsers(){
    this._usuarioService.getusers().subscribe(data => {
      this.users = data;
    }, error => {
      console.log(error);
    })
  }
  eliminarUser(id: any) {
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
        this._usuarioService.eliminarUsuario(id).subscribe(
          data => {
            swal("El Usuario ha sido borrado!", {
              icon: "success",
            });
            this.getUsers();
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
}
