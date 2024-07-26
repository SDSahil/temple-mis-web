import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private _auth: AuthService, private userService: UserService) { }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      // if (localStorage.getItem('user') != null) {
      //   console.log("Comes here " + localStorage.getItem('user'));
      //   return true;
      // } else {
      //   console.log("Comes here 1");
  
      //   this._router.navigate(['/authentication/side-login']);
      //   return false;
      // }
      const token = this._auth.getToken();
      if (!token) {
        console.log('logout...');
        throw token;
      }
      console.log('already logged in');
      if (!this.userService.getCurrUsrDet()) {
        await this.userService.getCurrUser();
      }
      return true;
    } catch (error) {
      this._router.navigate(['/authentication/side-login']);
      return false;
    }
  }
}
