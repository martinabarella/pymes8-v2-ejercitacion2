import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestWebApiService {

  constructor(private http: HttpClient) { }

  GetGenerico(url: string) {
    return this.http.get<any>(url);
  }

  Get() {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/posts');
  }

  GetById(id: string) {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts/' + id);
  }
}
