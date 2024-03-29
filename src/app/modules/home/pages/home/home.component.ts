import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SliderService } from '../../services/slider.service';
import { Global } from 'src/app/modules/services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements  OnInit {

  slider: any = [];
  getsliders: any = [];
  public url: string;


  constructor(
    private _sliderService: SliderService
  ) {
    this.url = Global.url;
   }
  ngOnInit(): void {
    this.getSlider();
    this.getSliders()
  }
  getSlider(){
    this._sliderService.getSlider().subscribe(data=>{
      this.slider=data;
      console.log(data)
    })
  }
  getSliders(){
    this._sliderService.getSliders("true").subscribe(data=>{
      this.getsliders=data.serverResponse;
      console.log(data)
    })
  }
}
