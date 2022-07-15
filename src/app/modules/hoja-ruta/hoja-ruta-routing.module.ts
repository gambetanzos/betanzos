import { HojaRutaComponent } from './pages/hoja-ruta/hoja-ruta.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { CorrespondenciaComponent } from './pages/correspondencia/correspondencia.component';
import { LisrhrComponent } from './pages/lisrhr/lisrhr.component';
import { OrganizacionComponent } from './pages/organizacion/organizacion.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { UsuarioAddComponent } from './pages/usuario-add/usuario-add.component';
import { RolesComponent } from './pages/roles/roles.component';
import { OrganizacionAddComponent } from './pages/organizacion-add/organizacion-add.component';
import { SubdirComponent } from './pages/subdir/subdir.component';
import { SubdirAddComponent } from './pages/subdir-add/subdir-add.component';
//import { PanelsComponent } from './pages/panels/panels.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {path:'dashboard',component:DashboardComponent},
      {path:'',component:HojaRutaComponent},
      {path:'usuarios',component:UsuarioComponent},
      {path:'usuarioAdd',component:UsuarioAddComponent},
      {path:'usuarioAdd/:id',component:UsuarioAddComponent},
      {path:'roles/:id',component:RolesComponent},
      {path:'correspondencia',component:CorrespondenciaComponent},
      {path:'listhr',component:LisrhrComponent},
      {path:'organizacion',component:OrganizacionComponent},
      {path:'organizacion-add',component:OrganizacionAddComponent},
      {path:'organizacion-add/:id',component:OrganizacionAddComponent},
      {path:'subdir/:id',component:SubdirComponent},
      {path:'subdir-add/:id',component:SubdirAddComponent},
      {path:'reportes',component:ReportesComponent}
    ]
  },
  {
    path: '**',//TODO 404 cuando no existe la ruta
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HojaRutaRoutingModule { }
