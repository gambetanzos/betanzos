
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MomentModule } from 'angular2-moment';
import { AngularFileUploaderModule } from "angular-file-uploader";


import { HojaRutaRoutingModule } from './hoja-ruta-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { HojaRutaComponent } from './pages/hoja-ruta/hoja-ruta.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footerh/footer.component';
import { CorrespondenciaComponent } from './pages/correspondencia/correspondencia.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { OrganizacionComponent } from './pages/organizacion/organizacion.component';
import { LisrhrComponent } from './pages/lisrhr/lisrhr.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { UsuarioAddComponent } from './pages/usuario-add/usuario-add.component';
import { RolesComponent } from './pages/roles/roles.component';
import { OrganizacionAddComponent } from './pages/organizacion-add/organizacion-add.component';
import { SubdirComponent } from './pages/subdir/subdir.component';
import { SubdirAddComponent } from './pages/subdir-add/subdir-add.component';
import { HojaAddComponent } from './pages/hoja-add/hoja-add.component';
import { SeguimientoComponent } from './pages/seguimiento/seguimiento.component';
import { SeguimientoAddComponent } from './pages/seguimiento-add/seguimiento-add.component';
import { PrintHrComponent } from './pages/print-hr/print-hr.component';
import { AddFilesComponent } from './pages/add-files/add-files.component';
import { ListFilesComponent } from './pages/list-files/list-files.component';
import { AsociarComponent } from './pages/asociar/asociar.component';
import { ListAsociarComponent } from './pages/list-asociar/list-asociar.component';
import { SearchComponent } from './pages/search/search.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { SpinerComponent } from './pages/spiner/spiner.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    SidebarComponent,
    HojaRutaComponent,
    HeaderComponent,
    FooterComponent,
    CorrespondenciaComponent,
    UsuarioComponent,
    OrganizacionComponent,
    LisrhrComponent,
    ReportesComponent,
    UsuarioAddComponent,
    RolesComponent,
    OrganizacionAddComponent,
    SubdirComponent,
    SubdirAddComponent,
    HojaAddComponent,
    SeguimientoComponent,
    SeguimientoAddComponent,
    PrintHrComponent,
    AddFilesComponent,
    ListFilesComponent,
    AsociarComponent,
    ListAsociarComponent,
    SearchComponent,
    RegistroComponent,
    SpinerComponent

  ],
  imports: [
    CommonModule,
    HojaRutaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MomentModule,
    AngularFileUploaderModule,
  
  ]
})
export class HojaRutaModule { }
