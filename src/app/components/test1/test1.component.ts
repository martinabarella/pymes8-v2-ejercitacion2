import { Component, OnInit } from '@angular/core';
import { ModalFormService } from '../../services/modal-form.service';
import {TestWebApiService} from '../../services/test-web-api.service';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component implements OnInit {

  constructor(private modalFormService: ModalFormService, private testWebApiService: TestWebApiService) { }

  public respuesta: any;
  ngOnInit() {
  }

  TestBloquearPantalla() {
    this.modalFormService.BloquearPantalla();
    setTimeout(() => {
      this.modalFormService.DesbloquearBloquearPantalla();
    }, 3000);
  }
  TestAlert() {
    this.modalFormService.Alert('Informacion', 'Se completo la transaccion con exito')
      .result.then(x => this.respuesta = x);
  }
  TestConfirm() {
    this.modalFormService.Confirm('Esta seguro de eliminar el registro?', 'Confirme por favor!'
      , 'Aceptar', 'Cancelar'
      ,  () => {
        this.respuesta = 'Boton Aceptar';
      }, () => {
        this.respuesta = 'Boton Cancelar';
      });
      // .result.then(x => {
      //   if (x) this.respuesta = "Boton Aceptar";
      //   if (!x) this.respuesta = "Boton Cancelar";
      // });
  }

  TestWebApi() {
    this.testWebApiService.Get()
      .subscribe(x => console.log( this.respuesta =  JSON.stringify(x) ) );
  }
  TestWebError() {
    this.testWebApiService.GetGenerico('https://repat.cba.gov.ar/api/colores')
      .subscribe(x => console.log( this.respuesta =  JSON.stringify(x) ) );
  }
}
