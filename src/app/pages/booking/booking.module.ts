import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking.routing';
import { BookingComponent } from './booking.component';


@NgModule({
  declarations: [
    BookingComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
  ]
})
export class BookingModule { }
