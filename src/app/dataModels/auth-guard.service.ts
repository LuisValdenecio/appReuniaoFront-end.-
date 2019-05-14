import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginAuthService } from './login-auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private loginAuthService : LoginAuthService, private router : Router) { }

  canActivate() {
    if (!this.loginAuthService.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }


}
