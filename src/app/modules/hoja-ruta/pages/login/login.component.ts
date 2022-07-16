import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  alert = "";
  identity: User;
  user = {
    email: "",
    password: ''
  };
  constructor(
    private authService: AuthService,
    private router: Router
  ) { this.identity = JSON.parse(localStorage.getItem('identity') || '{}'); }

  ngOnInit(): void {
  }
  login() {
    this.authService.login(this.user)
      .subscribe(
        res => {
          this.alert = res.serverResponse
          //console.log(this.alert);
          localStorage.setItem('token', res.token);
          localStorage.setItem('identity', JSON.stringify(res));

          this.router.navigate(['/hoja-ruta/dashboard']) ;
        },
        err => console.log(err)
      )
  }

}
