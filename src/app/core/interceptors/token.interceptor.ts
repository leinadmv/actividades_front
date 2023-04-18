import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

  const user = this.authService.getToken();

  if(user !== null) {

    const tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user}`
      }
    })
    return next.handle(tokenizeReq);

  }

  else {

    const tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer `
      }
    })
    return next.handle(tokenizeReq);

    }

  }
}
