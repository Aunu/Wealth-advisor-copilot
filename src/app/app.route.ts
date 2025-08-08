// app.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './components/Dashboard-component/dashboard.component';
import { ClientDetailsComponent } from './components/ClientDetails-component/ClientDetails-component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'about', component: DashboardComponent },
  { path: 'client-details', component: ClientDetailsComponent }
];