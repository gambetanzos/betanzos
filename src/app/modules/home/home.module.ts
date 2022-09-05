import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFileUploaderModule } from "angular-file-uploader";

import { HomeRoutingModule } from './home-routing.module';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { WorkComponent } from './pages/work/work.component';
import { AddSliderComponent } from './pages/add-slider/add-slider.component';


@NgModule({
  declarations: [
    HomepageComponent,
    HomeComponent,
    WorkComponent,
    AddSliderComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFileUploaderModule
  ]
})
export class HomeModule { }
