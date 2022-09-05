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
  public afuConfig: any;
  sliderForm: FormGroup;
  img:string="";
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
  }
  register(){
    const SLIDER: Slider = {
      titulo: this.sliderForm.get('titulo')?.value,
      img: this.img,
      detalle: this.sliderForm.get('detalle')?.value,
      urislaider: this.sliderForm.get('urislaider')?.value,
      patsslaider: this.sliderForm.get('patsslaider')?.value,
    }
    this._sliderService.registerSlider(SLIDER).subscribe(data => {
      console.log(data)
    }, error => {
      console.log(error);
      this.sliderForm.reset();
    })
  }
  fileUpload(data: any) {
    //this.hoja.urihoja = data.body.image;
    console.log(data.body.image)
    console.log("ha pasado algo")
    this.img=data.body.image
  }
}
