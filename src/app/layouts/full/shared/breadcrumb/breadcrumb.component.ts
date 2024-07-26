import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Data, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  pageInfo: Data | any = Object.create(null);

  constructor(private _router: Router, private _activRoute: ActivatedRoute, private titleService: Title) {
    _router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => _activRoute))
      .pipe(map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }))
      .pipe(filter((route) => route.outlet == 'primary'))
      .pipe(mergeMap((route) => route.data))
      .subscribe((event) => {
        titleService.setTitle(event['title']);
        this.pageInfo = event;
      });
  }
}
