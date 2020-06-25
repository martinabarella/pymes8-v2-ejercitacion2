import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { of } from "rxjs";
import { Equipos } from './Equipos';
//import { Empresas } from "../models/Empresas";
//import { Empresas } from './models/Empresas';


@Injectable(
  {providedIn: "root"}
)
export class EquiposService {
  resourceUrl: string;

  constructor(private httpClient: HttpClient) {
    this.resourceUrl = "https://pavii.ddns.net/api/equipos/";
  }

  get() {
    return this.httpClient.get(this.resourceUrl);
  }

  post(obj:Equipos) {
    return this.httpClient.post(this.resourceUrl, obj);
  }

  delete(Id) {
    return this.httpClient.delete(this.resourceUrl + Id);
  }

  put(Id: number, obj:Equipos) {
    return this.httpClient.put(this.resourceUrl + Id, obj);
  }

  getById(Id: number) {
    return this.httpClient.get(this.resourceUrl + Id);
  }
}