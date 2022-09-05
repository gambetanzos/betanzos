import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { WorkComponent } from './pages/work/work.component';
import { AddSliderComponent } from './pages/add-slider/add-slider.component';


const routes: Routes = [
  {
    path: '',
    children:[
     // {path:'',component:HomepageComponent},
      {path:'',component:HomeComponent},
      {path:'work',component:WorkComponent},
      {path:'addslider',component:AddSliderComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
