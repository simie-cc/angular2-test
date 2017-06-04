import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from "app/services/service/AuthService";
import { environment } from "environments/environment";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuth()) {
      return true;
    }

    //this.router.navigate(['/login']);
    alert('不可直接存取，請從前門登入');
    if(environment.production)
      window.location.href = 'http://www.google.com.tw' ;
    else
      this.router.navigate(['login']) ;

    return false;
  }
}
