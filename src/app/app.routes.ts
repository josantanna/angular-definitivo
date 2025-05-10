import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {path: 'login', 
    loadComponent:() => import('./pages/login/login.component').then(c=>c.LoginComponent)
  },
  {path: 'home',
    loadComponent:() => import('./pages/home/home.component').then(c=>c.HomeComponent)
  },
  {path: 'dashboard',
    loadComponent:() => import('./pages/dashboard/dashboard.component').then(c=>c.DashboardComponent)
  },
  { path: '', component: LoginComponent },
  
];

