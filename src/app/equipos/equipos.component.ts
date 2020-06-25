import { Component, OnInit } from '@angular/core';
import { Equipos } from '../Equipos'
//import { MockArticulosFamiliasService } from "../../services/mock-articulos-familias.service";
import { EquiposService } from "../equipos.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  Titulo = "Equipos"
  TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)"
  };
  AccionABMC = "L"; 
  
  submitted = false;

  Items: Equipos[] = [];

  FormReg: FormGroup;

  constructor(private equiposService:  EquiposService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.GetEquipos();

    this.FormReg = this.formBuilder.group({
      IdEquipo: [0],
      EquipoNombre: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(55)]
      ],
      EquipoRanking: [null, [Validators.required, Validators.pattern("[0-9]{1,7}")]],
      // FechaFundacion: [
      //   "",
      //   [Validators.required,Validators.pattern("(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}")]
      // ]
    });
  }

  GetEquipos() {
    this.equiposService.get()
    .subscribe((res:Equipos[]) => {
      this.Items = res;
    });
  }
  
  Agregar() {
    this.AccionABMC = "A";
    //this.FormReg.reset(this.FormReg.value);
    this.FormReg.reset();
    //this.FormReg.controls['IdEmpresa'].setValue(0);

    this.submitted = false;
    //this.FormReg.markAsPristine();
    this.FormReg.markAsUntouched();
  }

  Modificar(item) {

    this.submitted = false;
    this.FormReg.markAsPristine();
    this.FormReg.markAsUntouched();
    this.BuscarPorId(item, "A");
  }

  BuscarPorId(item, AccionABMC) {
    window.scroll(0, 0); // ir al incio del scroll
    this.equiposService.getById(item.IdEquipo).subscribe((res: any) => {
      this.FormReg.patchValue(res);
      // // //formatear fecha de  ISO 8061 a string dd/MM/yyyy
      // // var arrFecha = res.FechaFundacion.substr(0, 10).split("-");
      // // this.FormReg.controls.FechaFundacion.patchValue(
      // //   arrFecha[2] + "/" + arrFecha[1] + "/" + arrFecha[0]
      // // );
      this.AccionABMC = AccionABMC;
    });
  }

  Cancelar() {
    this.AccionABMC = "L";
    this.submitted = false;

    this.GetEquipos();
  }

   Eliminar(IdEquipo){
      this.equiposService.delete(IdEquipo).subscribe((res: string) =>
      {
        this.Cancelar();

        this.GetEquipos();
        window.alert("Registro eliminado");
      })
  }

  Grabar() {

    this.submitted = true;

    // verificar que los validadores esten OK
     if (this.FormReg.invalid) {
      window.alert("Revisar Datos");
      return;
    }
    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormReg.value };
    //convertir fecha de string dd/MM/yyyy a ISO para que la entienda webapi
    // var arrFecha = itemCopy.FechaFundacion.substr(0, 10).split("/");
    // if (arrFecha.length == 3)
    //   itemCopy.FechaFundacion = 
    //       new Date(
    //         arrFecha[2],
    //         arrFecha[1] - 1,
    //         arrFecha[0]
    //       ).toISOString();

    // agregar post
    if (itemCopy.IdEquipo == 0 || itemCopy.IdEquipo == null) {
      itemCopy.IdEquipo = 0;
      console.log(itemCopy);
      this.equiposService.post(itemCopy).subscribe((res: any) => {

        this.Cancelar();
        window.alert("Registro grabado");
        // this.modalDialogService.Alert('Registro agregado correctamente.');
        // this.Buscar();
      });
    } else {
      // modificar put
      this.equiposService
        .put(itemCopy.IdEquipo, itemCopy)
        .subscribe((res: any) => {
          this.Cancelar();
          window.alert("Registro modificado");
        });
    }
    //this.GetEquipos();
  }

}