import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';
import { NavService } from '@app/services/nav.service';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TablerIconsModule,NgScrollbarModule, MaterialModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

  private navopt!: boolean;
  
  constructor(private navService: NavService) {}

  ngOnInit(): void {
      this.navopt = this.navService.showClass;
  }

}
