import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';
import { ModalFormService } from '../services/modal-form.service';

@Injectable()
export class BloquearPantallaInterceptor implements HttpInterceptor {
  constructor(private ms: ModalFormService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('urlexcepcion')) {
      return next.handle(req);  // excepcion de bloquear pantalla
    }

    this.ms.BloquearPantalla();
    return next.handle(req).pipe(
      // delay(3000),  // demora solo para ejemplo
      finalize( () => this.ms.DesbloquearBloquearPantalla())
    );
  }
}
