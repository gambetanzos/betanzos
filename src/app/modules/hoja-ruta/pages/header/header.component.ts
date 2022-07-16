import {Component, EventEmitter, OnInit, Output, DoCheck} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  public searchString: string="";
  public identity: any ;
  public token: any ;
  constructor(public _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute) {  this.loadUser();

  }
  ngDoCheck(): void {
      this.loadUser();
    }

  ngOnInit(): void {
  }
  loadUser(){
    this.identity = JSON.parse(localStorage.getItem('identity')|| '{}');
   // this.token = JSON.parse(localStorage.getItem('token')|| '{}');

  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  goSearch(){
    this._router.navigate(['/hoja-ruta/search', this.searchString]);
  }
}
