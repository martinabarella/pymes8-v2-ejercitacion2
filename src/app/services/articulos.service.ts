import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { of } from "rxjs";
import { Articulo } from "../models/articulo";

@Injectable({
  providedIn: "root"
})
export class ArticulosService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = "http://localhost:49681/api/" + "articulos" + "/";
  }

  get(Nombre: string, Activo: boolean, PaginaActual: number) {
    let params = new HttpParams();
    if (Nombre != null) {
      params = params.append("Nombre", Nombre);
    }
    if (Activo != null) {   // para evitar error de null.ToString()
      params = params.append("Activo", Activo.toString());
    }
    params = params.append("numeroPagina", PaginaActual.toString());

    return this.httpClient.get(this.resourceUrl, { params: params });
  }

  getById(Id: any):Articulo {
    return this.httpClient.get(this.resourceUrl + Id);
  }

  post(obj:Articulo) {
    return this.httpClient.post(this.resourceUrl, obj);
  }

  put(id: number, obj:Articulo) {
    return this.httpClient.put(this.resourceUrl + id, obj);
  }

  delete(id, obj:Articulo) {
    return this.httpClient.delete(this.resourceUrl + id, obj);
  }
}
