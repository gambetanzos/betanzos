import { HojaRutaComponent } from './modules/hoja-ruta/pages/hoja-ruta/hoja-ruta.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  {
    path:'',
    loadChildren:()=>import(`./modules/home/home.module`).then(m => m.HomeModule)
  },
  {
    path:'hoja-ruta',
    component:HojaRutaComponent,
    loadChildren:()=>import('./modules/hoja-ruta/hoja-ruta.module').then(m => m.HojaRutaModule)
  },
  {
    path:'**',
    redirectTo:'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
