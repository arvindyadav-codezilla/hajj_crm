import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { authGuard } from '@core/Guards/auth.guard';

function getUserLanguage(): string {
  // You can modify this logic to check user's language preferences from localStorage, browser, etc.
  const userLang = localStorage.getItem('userLang') || navigator.language || 'en'; // Defaults to 'en' if none
  return userLang.startsWith('ar') ? 'ar' : 'en'; // Adjust if necessary to handle specific cases
}

export const routes: Routes = [
  {
    path: ':lang/dashboard',
    component: LayoutComponent,
    loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),

  },
  {
    path: ':lang/config',
    component: LayoutComponent,
    loadChildren: () => import('../config-form/config.module').then(m => m.ConfigModule) 
  },
  {
    path: ':lang/list',
    component: LayoutComponent,
    loadChildren: () => import('../job-listing/job-listing.module').then(m => m.JobListingModule) 
  },
  {
    path: ':lang/groups',
    component: LayoutComponent,
    loadChildren: () => import('../groups-form/groups.module').then(m => m.GroupsModule) 
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: () => {
      const language = getUserLanguage();
      return `${language}/auth/sign-in`;  // Redirects to the dynamic language login page
    },
  },
  {
    path: ':lang/auth',
    loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
