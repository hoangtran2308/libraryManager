import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenService} from "../token.service";
import {ITokenResponse} from "../../models/response/token.response";

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
    return next.handle(request);
  }
}
