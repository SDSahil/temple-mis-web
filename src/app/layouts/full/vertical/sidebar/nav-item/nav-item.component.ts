import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, OnChanges, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from '@app/interfaces/nav-item.interface';
import { MaterialModule } from '@app/material.module';
import { NavService } from '@app/services/nav.service';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-vertical-nav-item',
  standalone: true,
  imports: [CommonModule, MaterialModule, TablerIconsModule],
  templateUrl: './nav-item.component.html',
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)'))
    ])
  ]
})
export class NavItemComponent implements OnChanges {

  @HostBinding('attr.aria-expanded') ariaExpanded;
  @Output() toggleMobileLink: any = new EventEmitter<void>();
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() item: NavItem | any;
  @Input() depth: any;
  
  public expanded: boolean = false;

  constructor(private navService: NavService, private _router: Router) {
    this.ariaExpanded = this.expanded;
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnChanges() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        // console.log(`Checking '/${this.item.route}' against '${url}'`);
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
        //console.log(`${this.item.route} is expanded: ${this.expanded}`);
      }
    });
  }

  public get activeRouteGetter() : boolean {
    return this._router.isActive(this.item.route, true);
    // return this._router.isActive(this.item.route, { paths: 'exact', queryParams: 'exact', fragment: 'ignored', matrixParams: 'ignored' });
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this._router.navigate([item.route]);
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
    //scroll
    window.scroll({ top: 0, left: 0, behavior: 'smooth'});
    if (!this.expanded && window.innerWidth < 1024) {
      this.notify.emit();
    }
  }

  onSubItemSelected(item: NavItem) {
    if ((!item.children || !item.children.length) && (this.expanded && window.innerWidth < 1024)) {
      this.notify.emit();
    }
  }

}
