import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ModalFormService } from '../services/modal-form.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private ms: ModalFormService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('error')) {
      return next.handle(req);
    }
    console.warn('ErrorInterceptor');

    return next.handle(req).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        // 401 handled in auth.interceptor

        if (error.status !== 401 && error.error && error.error.ExceptionMessage) {
          this.ms.Alert( error.error.ExceptionMessage, 'Error', 'd');
        }
        return throwError(error);
      })
    );
  }
}
