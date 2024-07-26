import { Injectable } from '@angular/core';
import { BrowserStorage } from '@app/enums/browserStorage.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authToken: string | null;

  constructor(private _router: Router) {
    this.authToken = localStorage.getItem(BrowserStorage.TOKEN);
  }

  private setToken(token: string): void {
    localStorage.removeItem(BrowserStorage.TOKEN);
    localStorage.setItem(BrowserStorage.TOKEN, token);
    this.authToken = token;
    return;
  }

  private removeUser(): void {
    // localStorage.removeItem(BrowserStorage.USER);
    localStorage.removeItem(BrowserStorage.TOKEN);
    this.authToken = null;
  }

  // public setUser(user: User): void {
  //   localStorage.removeItem(BrowserStorage.USER);
  //   localStorage.setItem(BrowserStorage.USER, JSON.stringify(user));
  //   return;
  // }

  public login(token: string) {
    if (token) {
      this.setToken(token);
      // this._router.navigate(['/home']);
    }
  }

  public logout(toNavigate: boolean = true): void {
    this.removeUser();
    if (toNavigate) {
      this._router.navigate(['/authentication/side-login']);
    }
  }

  public getToken(): string | null {
    // return localStorage.getItem(BrowserStorage.TOKEN);
    return this.authToken;
  }

}
