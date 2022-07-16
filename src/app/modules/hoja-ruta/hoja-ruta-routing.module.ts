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
import { HojaAddComponent } from './pages/hoja-add/hoja-add.component';
import { SeguimientoAddComponent } from './pages/seguimiento-add/seguimiento-add.component';
import { SeguimientoComponent } from './pages/seguimiento/seguimiento.component';
import { PrintHrComponent } from './pages/print-hr/print-hr.component';
import { AddFilesComponent } from './pages/add-files/add-files.component';
import { ListFilesComponent } from './pages/list-files/list-files.component';
import { ListAsociarComponent } from './pages/list-asociar/list-asociar.component';
import { AsociarComponent } from './pages/asociar/asociar.component';
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
      {path:'hoja-add',component:HojaAddComponent},
      {path:'hoja-add/:id',component:HojaAddComponent},
      {path:'seguimiento/:id',component:SeguimientoComponent},
      {path:'seguimiento-add/:id',component:SeguimientoAddComponent},
      {path:'print/:id',component:PrintHrComponent},
      {path:'add-files/:id',component:AddFilesComponent},
      {path:'list-files/:id',component:ListFilesComponent},
      {path:'list-asociar/:id',component:ListAsociarComponent},
      {path:'asociar/:id',component:AsociarComponent},
      {path:'organizacion',component:OrganizacionComponent},
      {path:'organizacion-add',component:OrganizacionAddComponent},
      {path:'organizacion-add/:id',component:OrganizacionAddComponent},
      {path:'subdir/:id',component:SubdirComponent},
      {path:'subdir-add/:id',component:SubdirAddComponent},
      {path:'reportes',component:ReportesComponent},
      {path:'login',component:LoginComponent}
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
