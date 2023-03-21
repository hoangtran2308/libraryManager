import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpStatusCode,
  HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {TokenService} from "../token.service";
import {ITokenResponse} from "../../models/responses/token.response";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes('auth/login')) return next.handle(request)
    if(this.tokenService.getToken()) {
      request = request.clone(
        {
          headers: request.headers.set('Authorization', 'Bearer ' + (this.tokenService.getToken() as ITokenResponse).access_token)
        }
      )
    }

    return next.handle(request).pipe(catchError(x => this.handleAuthError(x)));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === HttpStatusCode.Unauthorized) {
    }
    if (err.status === HttpStatusCode.Forbidden) {
      console.log('Đăng nhập đi bạn ey')
    }
    if (err.status === HttpStatusCode.InternalServerError) {

    }
    if (err.status === 0) {

    }
    return throwError(err);
  }
}
