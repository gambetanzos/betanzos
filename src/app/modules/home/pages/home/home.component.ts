import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit {


  @ViewChild('initmodal')
  initmodal!: ElementRef;

  constructor(

  ) {

   }
  ngOnInit(): void {
   
  }
  ngAfterViewInit(): void {
    this,this.abrirModal()
  }

  private abrirModal(){
    this.initmodal.nativeElement.click();
  }
}
