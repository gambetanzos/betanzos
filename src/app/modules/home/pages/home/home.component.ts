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
  public url: string;


  constructor(
    private _sliderService: SliderService
  ) {
    this.url = Global.url;
   }
  ngOnInit(): void {
    this.getSlider()
  }
  getSlider(){
    this._sliderService.getSlider().subscribe(data=>{
      this.slider=data;
      console.log(data)
    })
  }



}
