import { HojaRutaComponent } from './pages/hoja-ruta/hoja-ruta.component';
import { AuthGuard } from 'src/app/auth.guard';

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
import { SearchComponent } from './pages/search/search.component';
//import { PanelsComponent } from './pages/panels/panels.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
      {path:'',component:HojaRutaComponent},
      {path:'usuarios',component:UsuarioComponent,canActivate:[AuthGuard]},
      {path:'usuarioAdd',component:UsuarioAddComponent,canActivate:[AuthGuard]},
      {path:'usuarioAdd/:id',component:UsuarioAddComponent,canActivate:[AuthGuard]},
      {path:'roles/:id',component:RolesComponent,canActivate:[AuthGuard]},
      {path:'correspondencia',component:CorrespondenciaComponent,canActivate:[AuthGuard]},
      {path:'listhr',component:LisrhrComponent,canActivate:[AuthGuard]},
      {path:'hoja-add',component:HojaAddComponent,canActivate:[AuthGuard]},
      {path:'hoja-add/:id',component:HojaAddComponent,canActivate:[AuthGuard]},
      {path:'seguimiento/:id',component:SeguimientoComponent},
      {path:'seguimiento-add/:id',component:SeguimientoAddComponent,canActivate:[AuthGuard]},
      {path:'print/:id',component:PrintHrComponent,canActivate:[AuthGuard]},
      {path:'add-files/:id',component:AddFilesComponent,canActivate:[AuthGuard]},
      {path:'list-files/:id',component:ListFilesComponent,canActivate:[AuthGuard]},
      {path:'list-asociar/:id',component:ListAsociarComponent,canActivate:[AuthGuard]},
      {path:'asociar/:id',component:AsociarComponent,canActivate:[AuthGuard]},
      {path:'organizacion',component:OrganizacionComponent,canActivate:[AuthGuard]},
      {path:'organizacion-add',component:OrganizacionAddComponent,canActivate:[AuthGuard]},
      {path:'organizacion-add/:id',component:OrganizacionAddComponent,canActivate:[AuthGuard]},
      {path:'subdir/:id',component:SubdirComponent,canActivate:[AuthGuard]},
      {path:'subdir-add/:id',component:SubdirAddComponent,canActivate:[AuthGuard]},
      {path:'reportes',component:ReportesComponent,canActivate:[AuthGuard]},
      {path:'login',component:LoginComponent},
      {path:'search/:search',component:SearchComponent}
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
