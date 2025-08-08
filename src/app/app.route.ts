// app.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './components/Dashboard-component/dashboard.component';
import { ClientDetailsComponent } from './components/ClientDetails-component/ClientDetails-component';
import { AdvisorDashboardComponent } from './components/advisor-dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'about', component: DashboardComponent },
  { path: 'client-details', component: ClientDetailsComponent },
  { path: 'advisor-analytics', component: AdvisorDashboardComponent }
];