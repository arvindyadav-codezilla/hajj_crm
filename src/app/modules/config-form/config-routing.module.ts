import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigFormComponent } from './config-form.component';

const routes: Routes = [
  {
    path: 'job-types',
    component: ConfigFormComponent,
    data: { type: 'job-types' },
  },
  {
    path: 'shift-timings',
    component: ConfigFormComponent,
    data: { type: 'shift-timings' },
  },
  {
    path: 'id-types',
    component: ConfigFormComponent,
    data: { type: 'id-types' },
  },
  {
    path: 'academic-qualifications',
    component: ConfigFormComponent,
    data: { type: 'academic-qualifications' },
  },
  {
    path: 'language-preference',
    component: ConfigFormComponent,
    data: { type: 'language-preference' },
  },
  {
    path: 'language-levels',
    component: ConfigFormComponent,
    data: { type: 'language-levels' },
  },
  {
    path: 'clothes-sizes',
    component: ConfigFormComponent,
    data: { type: 'clothes-sizes' },
  },
  {
    path: 'doc-types',
    component: ConfigFormComponent,
    data: { type: 'doc-types' },
  },
  {
    path: 'availabilities',
    component: ConfigFormComponent,
    data: { type: 'availabilities' },
  },
  {
    path: 'rating-types',
    component: ConfigFormComponent,
    data: { type: 'rating-types' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Use forChild for lazy-loaded routes
  exports: [RouterModule],
})
export class ConfigRoutingModule {}
