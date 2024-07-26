import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './activities.component';

const routes: Routes = [
  {
    path: '',
    component: ActivitiesComponent,
    data: {
      title: 'Activities'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
