import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {

  titulo = '';
  texto = '';
  textoBotonTrue = '';
  textBotonFalse = '';
  bloquearPantalla = false;
  classHeader = 'bg-success';
  faIcon = 'fa-check-circle';

  ngOnInit(): void {
  }
  constructor(public activeModal: NgbActiveModal) {
    this.bloquearPantalla = false;
  }
  cerrar() {
      this.activeModal.close();
  }
  setTipo(tipo: string = 's') {
    tipo = tipo.toLowerCase();
    switch (tipo) {
      case 's':
          this.classHeader = 'bg-success';
          this.faIcon = 'fa-check-circle';
          break;
        case 'd':
          this.classHeader = 'bg-danger';
          this.faIcon = 'fa-fail';
          break;
        case 'i':
          this.classHeader = 'bg-info';
          this.faIcon = 'fa-info';
          break;
        case 'w':
          this.classHeader = 'bg-warning';
          this.faIcon = 'fa-warning';
          break;
          default:
        this.classHeader = 'bg-success';
        break;
    }
  }


}
