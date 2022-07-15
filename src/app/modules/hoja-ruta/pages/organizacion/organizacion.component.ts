import { Component, OnInit } from '@angular/core';
import { OrganizacionService } from '../../services/organizacion.service';
import { Organizacion } from '../../models/Organizacion';
import swal from 'sweetalert';

@Component({
  selector: 'app-organizacion',
  templateUrl: './organizacion.component.html',
  styleUrls: ['./organizacion.component.css']
})
export class OrganizacionComponent implements OnInit {
  public orgs: Organizacion[] = [];

  constructor(private _orgService: OrganizacionService) { }

  ngOnInit(): void {
    this.getOrgs();
  }
  getOrgs(){
    this._orgService.getOrg().subscribe(data => {
      console.log(data);
      this.orgs = data;
    }, error => {
      console.log(error);
    })
  }
  eliminarOrg(id: any) {
    //Alerta
    swal({
     title: "¿Estás seguro?",
     text: "Una vez borrado no podrás recuperarlo!",
     icon: "warning",
     buttons: [true, true],
     dangerMode: true
   })
   .then((willDelete) => {
     if (willDelete) {
      this._orgService.eliminarOrg(id).subscribe(
         data => {
           swal("La Unidad ha sido borrado!", {
             icon: "success",
           });
           this.getOrgs();
         },
         error => {
           console.log(error);
         }
       );

     } else {
       swal("Tranquilo, nada se ha borrado!");
     }
   });
 }

}
