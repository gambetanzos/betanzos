import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { HojarutaService } from '../../services/hojaruta.service';
import { Hojaruta } from '../../models/hojaruta';
import { Organizacion } from '../../models/Organizacion';
import { OrganizacionService } from '../../services/organizacion.service';
import { Subdir } from '../../models/subdir';
import { SubdirService } from '../../services/subdir.service';
import { Segui } from '../../models/seguimiento';
import { SeguimientoService } from '../../services/seguimiento.service';
import { UsuarioService } from '../../services/usuario.service';
import { disableDebugTools } from '@angular/platform-browser';

@Component({
  selector: 'app-seguimiento-add',
  templateUrl: './seguimiento-add.component.html',
  styleUrls: ['./seguimiento-add.component.css']
})
export class SeguimientoAddComponent implements OnInit {
//copias
formularioIncorrecto = false;


public orgc: Organizacion[] = [];
  copy:string="";
  seg:any=[];
  catco:number=0;
  cant:number=0
  copia:boolean=false;
  paramsc:string="";
  public identity: any;
  subscription: Subscription = new Subscription;
  params = "";
  params2 = "";
  params2c = "";
  detallesc="";
  flac: string = "";
  mostrarError: boolean;
  textError: string;
  mostrarError1: boolean;
  textError1: string;
  user: any = [];
  userc: any = [];
  orgselec: any[] = [];
  orgseleco: any[] = [];
  public org: Organizacion[] = [];
  segui: any = [];
  seguiForm: FormGroup;
  titulo = 'derivar documento';
  id: string | null;
  ids: string | null;
  today = new Date();
  origenen: string = "ENVIADO";
  origendev: string = "DERIVADO";
  public hojas: Hojaruta[] = [];
  public hoja: any = [];
  idh: string = "";
  idnuit: string = "";
  ref: string = "";
  orhr: string = "";
  copi:string = "";
  asoc:boolean=false;
  oficina:string="";
  nombre:string="";
  origenreg: string = "REGISTRADO";
  constructor(private fb: FormBuilder,
    private _hojaService: HojarutaService,
    private router: Router,
    private _seguiService: SeguimientoService,
    private _orgService: OrganizacionService,
    public _authService: AuthService,
    private _subdirService: SubdirService,
    private _userService: UsuarioService,
    private aRouter: ActivatedRoute) {
    this.seguiForm = this.fb.group({
      destino: ['', Validators.required],
      detalles: ['', Validators.required]

    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.ids = this.aRouter.snapshot.paramMap.get('ids');
    this.loadUser();
    this.mostrarError = false;
    this.textError = '';
    this.mostrarError1 = false;
    this.textError1 = '';

  }
  loadUser() {
    this.identity = JSON.parse(localStorage.getItem('identity') || '{}');
    // this.token = JSON.parse(localStorage.getItem('token')|| '{}');
  }
  ngOnInit(): void {
    this.getOrga();
    this.getNuit();
    this.getSub();
    this.getSegui();
  }
  getuser() {
    if (this.params !== null) {
      this.subscription = this._userService.obtenerUserpost(this.seguiForm.get('destino')?.value).subscribe(data => {
        this.user = data.serverResponse;
        this.params2 = this.user.post
        if (this.params2 === this.identity.post) {
          this.flac = "si"
        } else
          this.flac = "no"
      })
    }
  }
  getuserc() {
    if (this.paramsc !== null) {
      this.subscription = this._userService.obtenerUserpost(this.paramsc).subscribe(data => {
        this.userc = data.serverResponse;
        this.params2c = this.userc.post
        if (this.params2c === this.identity.post) {
          this.flac = "si"
        } else
          this.flac = "no"
      })
    }
  }

  registerSegui() {
    const SEGUI: Segui = {
      nuit: this.idnuit,
      referencia: this.ref,
      origenhr: this.orhr,
      copia:this.copi,
      asociado:this.asoc,
      oficina:this.oficina,
      nombre:this.nombre,
      destino: this.seguiForm.get('destino')?.value,
      detalles: this.seguiForm.get('detalles')?.value
    }
    const HOJA: Hojaruta = {
      estado: this.origenen,
    }
    const SEGUIS: Segui = {
      estado: this.origendev,
      fecharespuesta:this.today
    }
    if (this.id !== null && this.flac === "no") {
      this._seguiService.EditarSegui(this.id, SEGUI).subscribe(data => {
        this.router.navigate(['/hoja-ruta/correspondencia']);
        if (this.ids !== null) {
          this._seguiService.EditarSeguis(this.ids, SEGUIS).subscribe(data => {
          }, error => {
            console.log(error);
          })
        }
        console.log(SEGUI)
      }, error => {
        console.log(error);
        this.seguiForm.reset();
      })
      this._hojaService.obtenerHoja(this.id).subscribe(data => {
        this.hoja = data.serverResponse;
        this.idh = this.hoja._id;
        this._hojaService.EditarHoja(this.idh, HOJA).subscribe(data => {
        }, error => {
          console.log(error);
        })
      }, error => {
        console.log(error);
      })
    }
    else {
      this.error('No se puede derivar a su propia oficina');
      return;
    }

  }
  getOrga() {
    this.subscription = this._orgService.getOrg().subscribe(data => {
      this.org = data;

    }, error => {
      console.log(error);
    })
  }
  getOrgac() {
      this._orgService.getOrg().subscribe(data => {
      this.orgc = data;

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
  getSubc() {
    if (this.paramsc !== null) {
      this.subscription = this._orgService.obtenerOrg(this.paramsc).subscribe(data => {
        this.orgseleco = data.subdirecciones;
      }, error => {
        console.log(error);
      })
    }
  }
  getNuit() {
    if (this.id !== null) {
      this._hojaService.obtenerHoja(this.id).subscribe(data => {
        this.hoja = data.serverResponse;
        this.idnuit = this.hoja.nuit;
        this.ref = this.hoja.referencia;
        this.orhr = this.hoja.origen;
      }, error => {
        console.log(error);
      })
    }
  }
  getSegui() {
    if (this.ids !== null) {
      this._seguiService.obtenerSegui(this.ids).subscribe(data => {
        this.segui = data;
        this.copi = this.segui.copia;
        this.asoc = this.segui.asociado;
        this.oficina=this.segui.destino;
        //  this.nombre=this.segui.nombre;
      }, error => {
        console.log(error);
      })
    }
  }
  error(valor: string) {
    this.mostrarError = true;
    this.textError = valor;

    // Mostramos error por 4 segundos
    setTimeout(() => {
      this.mostrarError = false;
    }, 4000);
  }
  error1(valor: string) {
    this.mostrarError1 = true;
    this.textError1 = valor;

    // Mostramos error por 4 segundos
    setTimeout(() => {
      this.mostrarError1 = false;
    }, 4000);
  }
  copias(): void {
    this.getOrgac();
    this.getSubc()
    this.getuserc()
    this._seguiService.buscarnuit(this.idnuit).subscribe(data => {
      this.seg=data
      this.catco = this.seg.filter((list: { copia: string; }) => list.copia).length;
      this.cant=this.catco+1
    }, error => {
      console.log(error)
    })
  }
  cerrar(): void {
    this.copia=false
    this.resetCampos()
  }
  agregarCita() {
    if(this.paramsc == '' || this.detallesc == ''){
      this.error1('todos los campos deben ser llenados');
      return;
    }
    this.formularioIncorrecto = false;
    this._seguiService.buscarnuit(this.idnuit).subscribe(data => {
      this.seg=data
      this.catco = this.seg.filter((list: { copia: string; }) => list.copia).length;
      console.log(this.catco)
      this.cant=this.catco+1
      this.copy="copia"+this.cant
      // Creamos objeto para enviarselo al padre
    const SEGUIC: Segui = {
      nuit: this.idnuit,
      referencia: this.ref,
      origenhr: this.orhr,
      destino:  this.paramsc,
      detalles: this.detallesc,
      copia:this.copy,
      oficina:this.oficina,
      nombre:this.nombre
    }
    if (this.id !== null && this.flac === "no") {
      this._seguiService.EditarSegui(this.id, SEGUIC).subscribe(data => {
      }, error => {
        console.log(error);
      })
    }
    else {
      this.error1('No se puede derivar a su propia oficina');
      return;
    }
    this.resetCampos();
    this.copias();
    }, error => {
      console.log(error)
    })
  }

  resetCampos() {
    this.detallesc = '';
    this.paramsc = '';
    this.params2c = '';
  }
}
