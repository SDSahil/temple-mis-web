import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PagesRoutes } from "./pages.routing.module";
import { MaterialModule } from "@app/material.module";
import { FormsModule } from "@angular/forms";
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild(PagesRoutes),
  ],
  declarations: [
    HomeComponent,
  ]
})
export class PagesModule { }