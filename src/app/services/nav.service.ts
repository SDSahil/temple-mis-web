import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  public showClass: boolean = false;
  public currentUrl = new BehaviorSubject<any>(undefined);

  constructor(private _router: Router) {
    _router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }
}
