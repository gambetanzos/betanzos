import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HojarutaService } from '../../services/hojaruta.service';
import { Hojaruta } from '../../models/hojaruta';
import { Organizacion } from '../../models/Organizacion';
import { OrganizacionService } from '../../services/organizacion.service';
import { Subdir } from '../../models/subdir';
import { SubdirService } from '../../services/subdir.service';
import { Segui } from '../../models/seguimiento';
import { SeguimientoService } from '../../services/seguimiento.service';

@Component({
  selector: 'app-seguimiento-add',
  templateUrl: './seguimiento-add.component.html',
  styleUrls: ['./seguimiento-add.component.css']
})
export class SeguimientoAddComponent implements OnInit {
  subscription: Subscription = new Subscription;
  params = "";
  orgselec: any []=[] ;
  public org: Organizacion[] = [];
  public segui: Segui[] = [];
  seguiForm: FormGroup;
  titulo = 'derivar documento';
  id: string | null;
  ids: string | null;

  origenen: string = "ENVIADO";
  origendev: string = "DERIVADO";
  public hojas: Hojaruta[] = [];
  public hoja: any  = [];
  idh: string = "";
  idnuit: string = "";
  ref: string = "";
  orhr: string="";
  origenreg: string = "REGISTRADO";
  constructor(private fb: FormBuilder,
    private _hojaService: HojarutaService,
    private router: Router,
    private _seguiService: SeguimientoService,
    private _orgService: OrganizacionService,
    private _subdirService: SubdirService,
    private aRouter: ActivatedRoute) {
      this.seguiForm = this.fb.group({
        destino: ['', Validators.required],
        detalles: ['', Validators.required],
        instrucciones: [''],
        //fecharecepcion: ['', Validators.required],
        //estado: ['', Validators.required],
        //post: ['', Validators.required],
      })
      this.id = this.aRouter.snapshot.paramMap.get('id');
      this.ids = this.aRouter.snapshot.paramMap.get('ids');
    }

  ngOnInit(): void {
    this.getOrga();
    this.getNuit();
    this.getSub();
  }
  registerSegui() {
    const SEGUI: Segui = {
      nuit:this.idnuit,
      referencia:this.ref,
      origenhr:this.orhr,
      destino: this.seguiForm.get('destino')?.value,
      detalles: this.seguiForm.get('detalles')?.value,
      instrucciones: this.seguiForm.get('instrucciones')?.value,
    }
    const HOJA: Hojaruta = {
      estado:this.origenen,
    }
    const SEGUIS: Segui= {
      estado:this.origendev,

    }
    if (this.id !== null) {
      this._seguiService.EditarSegui(this.id, SEGUI).subscribe(data =>{
        this.router.navigate(['/hoja-ruta/correspondencia']);
      }, error => {
        console.log(error);
        this.seguiForm.reset();
      })
      this._hojaService.obtenerHoja(this.id).subscribe(data => {
        this.hoja = data.serverResponse;
        this.idh= this.hoja._id;
        this._hojaService.EditarHoja (this.idh, HOJA).subscribe(data =>{
        }, error => {
          console.log(error);
        })
      }, error => {
        console.log(error);
      })
    }
    else
    {
      console.log(SEGUI);
      this._seguiService.register(SEGUI).subscribe(data => {
        this.router.navigate(['/hoja-ruta/correspondencia']);
      }, error => {
        console.log(error);
        this.seguiForm.reset();
      })
    }
    if (this.ids !== null) {
        this._seguiService.EditarSeguis (this.ids, SEGUIS).subscribe(data =>{
        }, error => {
          console.log(error);
        })
    }
  }
  getOrga(){
    this.subscription =  this._orgService.getOrg().subscribe(data => {
      this.org = data;

    }, error => {
      console.log(error);
    })
  }
  getSub() {

    if (this.params !== null) {
      this.subscription = this._orgService.obtenerOrg(this.params).subscribe(data => {
        this.orgselec = data.subdirecciones;

      }, error => {
        console.log(error);
      })
    }
  }
  getNuit(){
    if (this.id !== null) {
      this._hojaService.obtenerHoja(this.id).subscribe(data => {
        this.hoja = data.serverResponse;
        this.idnuit=this.hoja.nuit;
        this.ref=this.hoja.referencia;
        this.orhr=this.hoja.origen;
      }, error => {
        console.log(error);
      })
    }
 }
  instruccions: any[] = [
    { value: 'Remita informe ', nombre: 'Remita informe '},
    { value: 'Dar el curso al trámite', nombre: 'Dar el curso al trámite'},
    { value: 'Supervisé', nombre: 'Supervisé'},
    { value: 'Proceda a su registro', nombre: 'Proceda a su registro'},
    { value: 'Prepare el documento', nombre: 'Prepare el documento'},
    { value: 'Revíse', nombre: 'Revíse'},
    { value: 'Resuelva', nombre: 'Resuelva'},
    { value: 'Para su conocimiento', nombre: 'Para su conocimiento'},
    { value: 'Otros', nombre: 'Otros'},
]
}
