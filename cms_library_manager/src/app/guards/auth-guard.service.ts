import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AccountService} from "../services/intercept/account.service";
import {TokenService} from "../services/token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService,
              private router: Router,
              private tokenService: TokenService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.tokenService.getToken()) {
        // console.log('da active')
        // this.router.navigateByUrl('/pages/book-manager')
        return true
      } else {
        this.router.navigateByUrl('/auth/login')
        return false
      }
  }

}
