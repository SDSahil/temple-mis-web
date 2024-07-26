import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const PagesRoutes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,
        data: {
            title: 'Home',
        },
    },
    {
        path: 'about',
        component: HomeComponent,
        data: {
            title: 'About Us',
        },
    },
    {
        path: 'contact',
        component: HomeComponent,
        data: {
            title: 'Contact Us',
        },
    },
];
