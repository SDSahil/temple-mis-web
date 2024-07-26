import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppSettings } from '@app/interfaces/app-settings.interface';
import { MaterialModule } from '@app/material.module';
import { CoreService } from '@app/services/core.service';
import { HorizontalHeaderComponent } from './horizontal/header/header.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { sidebarData } from '@app/constants/sidebar-data.constants';
import { NavItem } from '@app/interfaces/nav-item.interface';
import { SidebarComponent as HorizontalSidebarComponent } from './horizontal/sidebar/sidebar.component';
import { SidebarComponent as VerticalSidebarComponent } from './vertical/sidebar/sidebar.component';
import { MatSidenav } from '@angular/material/sidenav';
import { NavItemComponent } from './vertical/sidebar/nav-item/nav-item.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { UserService } from '@app/services/user.service';
import { User } from '@app/models/auth.model';

const MOBILE_VIEW = 'screen and (max-width: 768px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';
const MONITOR_VIEW = 'screen and (min-width: 1024px)';


@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, NgScrollbarModule, HorizontalHeaderComponent, HorizontalSidebarComponent, VerticalSidebarComponent, NavItemComponent, BreadcrumbComponent],
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
})
export class FullComponent implements OnInit, OnDestroy {

  @ViewChild('leftsidenav')
  public sidenav!: MatSidenav;

  private htmlElement!: HTMLHtmlElement;
  private isMobileScreen: boolean = false;
  private layoutChangesSubscription: Subscription = Subscription.EMPTY;
  private isContentWidthFixed = true;
  private isCollapsedWidthFixed = false;

  public options!: AppSettings;
  public navItems: NavItem[] = sidebarData;
  public usrDet?: User;

  constructor(private _settings: CoreService, private _breakPoint: BreakpointObserver, private userService: UserService) {
    this.navItems = this.navItems.filter(item => item.vertical || item.navCap);
    this.htmlElement = document.querySelector('html')!;
    this.receiveOptions();
  }

  ngOnInit(): void {
    this.usrDet = this.userService.getCurrUsrDet();
    this.layoutChangesSubscription = this._breakPoint.observe([MOBILE_VIEW, TABLET_VIEW, MONITOR_VIEW]).subscribe(state => {
      // SidenavOpened must be reset true when layout changes
      this.options.sidenavOpened = true;
      this.isMobileScreen = state.breakpoints[MOBILE_VIEW];
      if (this.options.sidenavCollapsed == false) {
        this.options.sidenavCollapsed = state.breakpoints[TABLET_VIEW];
      }
      this.isContentWidthFixed = state.breakpoints[MONITOR_VIEW];
    });
  }

  ngOnDestroy(): void {
    this.layoutChangesSubscription.unsubscribe();
  }

  get isOver(): boolean {
    return this.isMobileScreen;
  }

  onSidenavClosedStart() {
    this.isContentWidthFixed = false;
  }

  onSidenavOpenedChange(isOpened: boolean) {
    this.isCollapsedWidthFixed = !this.isOver;
    this.options.sidenavOpened = isOpened;
    this._settings.setOptions(this.options);
  }

  receiveOptions(): void {
    const opts: AppSettings = this._settings.getOptions();
    this.options = opts;
    this.toggleDarkTheme(opts);
  }

  toggleDarkTheme(options: AppSettings) {
    if (options.theme === 'dark') {
      this.htmlElement.classList.add('dark-theme');
      this.htmlElement.classList.remove('light-theme');
    } else {
      this.htmlElement.classList.remove('dark-theme');
      this.htmlElement.classList.add('light-theme');
    }
  }
}