import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";

import { RouterModule } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';  

import { FormsModule } from "@angular/forms"; // <-- NgModel lives here
import { ReactiveFormsModule } from "@angular/forms";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BloquearPantallaInterceptor } from "./shared/bloquear-pantalla.interceptors";
import { ErrorInterceptor } from "./shared/error.interceptor";

//import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {
  NgbPaginationModule,
  NgbModalModule
} from "@ng-bootstrap/ng-bootstrap";
import {
  NgbDatepickerI18n,
  NgbDateParserFormatter
} from "@ng-bootstrap/ng-bootstrap";
import { NgbDateEsParserFormatter } from "./shared/ngb-date-es-parser-formatter";
import { DatepickerEsI18n, I18n } from "./shared/date-picker-es-i18n";

import { Test1Component } from './components/test1/test1.component';

import { ModalFormComponent } from "./components/modal-form/modal-form.component";
import { MenuComponent } from "./components/menu/menu.component";
import { InicioComponent } from "./components/inicio/inicio.component";
import { ArticulosComponent } from "./components/articulos/articulos.component";
import { ArticulosFamiliasComponent } from "./components/articulos-familias/articulos-familias.component";

import { registerLocaleData } from "@angular/common";
import localeEs from "@angular/common/locales/es-AR";

registerLocaleData(localeEs, "es");

@NgModule({
  declarations: [
    AppComponent,

    ModalFormComponent,

    MenuComponent,
    InicioComponent,
    ArticulosComponent,
    ArticulosFamiliasComponent,
    Test1Component
  ],
  imports: [
    BrowserModule,
    NgbPaginationModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/inicio', pathMatch: 'full' },
      { path: 'inicio', component: InicioComponent },
      { path: 'articulos', component: ArticulosComponent },
      { path: 'articulosfamilias', component: ArticulosFamiliasComponent },
      { path: 'test1', component: Test1Component }
    ])
  ],
  entryComponents: [ModalFormComponent],
  providers: [
    NgbDateEsParserFormatter,
    { provide: HTTP_INTERCEPTORS, useClass: BloquearPantallaInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: NgbDateParserFormatter, useClass: NgbDateEsParserFormatter },
    I18n,
    { provide: NgbDatepickerI18n, useClass: DatepickerEsI18n},
    {provide: APP_BASE_HREF, useValue : '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
