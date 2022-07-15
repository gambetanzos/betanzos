import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { WorkComponent } from './pages/work/work.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {path:'',component:HomepageComponent},
      {path:'home',component:HomeComponent},
      {path:'work',component:WorkComponent}
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
