import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { sidebarData } from '@app/constants/sidebar-data.constants';
import { NavItem } from '@app/interfaces/nav-item.interface';
import { MaterialModule } from '@app/material.module';
import { Subscription } from 'rxjs';
import { NavItemComponent } from './nav-item/nav-item.component';

const MEDIA: string = '(min-width: 1200px)';

@Component({
  selector: 'app-horizontal-sidebar',
  standalone: true,
  imports: [CommonModule, MaterialModule, NavItemComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnDestroy {

  public navItems: NavItem[] = sidebarData;
  public parentActive!: string;

  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  private _routeSubscription: Subscription;

  constructor(private _router: Router, private _media: MediaMatcher, private _changeDetectRef: ChangeDetectorRef) {
    this.navItems = this.navItems.filter(item => item.horizontal || item.navCap);
    this.mobileQuery = _media.matchMedia(MEDIA);
    this._mobileQueryListener = () => _changeDetectRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this._routeSubscription = _router.events.subscribe(() => (this.parentActive = this._router.url.split('/')[1]));
  }

  ngOnDestroy(): void {
    this._routeSubscription.unsubscribe();
  }

}
