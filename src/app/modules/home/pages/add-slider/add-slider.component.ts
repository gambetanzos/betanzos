import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Slider } from '../../models/slider';
import { SliderService } from '../../services/slider.service';
import { Global } from 'src/app/modules/services/global';

@Component({
  selector: 'app-add-slider',
  templateUrl: './add-slider.component.html',
  styleUrls: ['./add-slider.component.css']
})
export class AddSliderComponent implements OnInit {
  permitirRegistro:string = "";
  estado1:string="true";
  estado2:string="false";
  slider: any = [];
  getslider:any=[];
  public afuConfig: any;
  sliderForm: FormGroup;
  img:string="";
  urislaider:string="";
  patsslaider:string="";
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _sliderService: SliderService,
    private aRouter: ActivatedRoute
  ) {
    this.sliderForm = this.fb.group({
      titulo: ['', Validators.required],
      img: [''],
      detalle: ['', Validators.required],
      urislaider: [''],
      patsslaider: [''],
    })

    this.afuConfig = {
      multiple: true,
      formatsAllowed: ".jpg,.png, .gif, .jpeg, .pdf",
      //maxSize: "50",
      uploadAPI: {
        url: Global.url + 'uploadslider'
      },
      theme: "attachPin",
      hideProgressBar: true,
      hideResetBtn: true,
      hideSelectBtn: false,
      fileNameIndex: true,
      replaceTexts: {
        selectFileBtn: 'Select Files',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Sube tu archivo',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !',
        sizeLimit: 'Size Limit'
      }
    };
   }

  ngOnInit(): void {
    this.getSlider()
  }
  register(){
    const SLIDER: Slider = {
      titulo: this.sliderForm.get('titulo')?.value,
      img: this.img,
      detalle: this.sliderForm.get('detalle')?.value,
      urislaider: this.urislaider,
      patsslaider: this.patsslaider
    }
    this._sliderService.registerSlider(SLIDER).subscribe(data => {
      console.log(data)
    }, error => {
      console.log(error);
      this.sliderForm.reset();
    })
  }
  sliderUpload(data: any) {
    this.img = data.body.serverResponse.img;
    this.urislaider = data.body.serverResponse.urislaider;
    this.patsslaider = data.body.serverResponse.patsslaider;
    console.log(data)
    console.log("ha pasado algo")
    //this.img=data.body.image
  }
  cambiarestado(id:any){
    const SLIDER1: Slider = {
      estado: this.estado1,
    }
    const SLIDER2: Slider = {
      estado: this.estado2,
    }
    this._sliderService.listSlider(id).subscribe(data=>{
      this.getslider=data.serverResponse;
      console.log(data.serverResponse)
      if(this.getslider.estado=="true"){
        this._sliderService.EditarSlider(id,SLIDER2).subscribe(data=>{
          this.getSlider()
        })
      }else{
        this._sliderService.EditarSlider(id,SLIDER1).subscribe(data=>{
          this.getSlider()
        })
      }

    }, error => {
      console.log(error);
    })

  }
  getSlider(){
    this._sliderService.getSlider().subscribe(data=>{
      this.slider=data;
      console.log(data)
    }, error => {
      console.log(error);
    })
  }
}

