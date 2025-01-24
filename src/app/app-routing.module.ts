import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@core/Guards/auth.guard';
import { MultiStepFormComponent } from './modules/multi-step-form/multi-step-form.component';

const routes: Routes = [
  {
    path:':lang/jobapplication',component:MultiStepFormComponent,
  },
  {
    path: '',
    loadChildren: () => import('./modules/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: ':lang/auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: ':lang/job',
    loadChildren: () => import('./modules/jobApplication/jobApplication.module').then((m) => m.JobApplicationModule),
  },
  {
    path: ':lang/errors',
    loadChildren: () => import('./modules/error/error.module').then((m) => m.ErrorModule),
  },
  {
    path: ':lang/**',
    redirectTo: ':lang/errors/404',
    pathMatch: 'full',
  },
  { 
    path: '**', 
    redirectTo: 'en/errors/404', 
    pathMatch: 'full',
  },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
