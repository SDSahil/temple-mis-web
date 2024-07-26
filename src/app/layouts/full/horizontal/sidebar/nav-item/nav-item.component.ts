import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '@app/material.module';
import { NavService } from '@app/services/nav.service';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-horizontal-nav-item',
  standalone: true,
  imports: [CommonModule, MaterialModule, TablerIconsModule],
  templateUrl: './nav-item.component.html',
})
export class NavItemComponent {

  @Input() depth: any;
  @Input() item: any;

  constructor(private navService: NavService, private _router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  public get activeRouteGetter(): boolean {
    return this._router.isActive(this.item.route, true);
    // return this._router.isActive(this.item.route, { paths: 'exact', queryParams: 'exact', fragment: 'ignored', matrixParams: 'ignored' });
  }


  onItemSelected(item: any) {
    if (!item.children || !item.children.length) {
      this._router.navigate([item.route]);
    }
  }

}
