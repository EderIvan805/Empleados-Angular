import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'employers-list', pathMatch: 'full' },
  {path: 'employers-list', loadComponent: () => import('./employers-list/employers-list.page').then(m => m.EmployersListPage)},
  {
    path: 'employers-register',
    loadComponent: () => import('./employers-register/employers-register.page').then( m => m.EmployersRegisterPage)
  },
];
