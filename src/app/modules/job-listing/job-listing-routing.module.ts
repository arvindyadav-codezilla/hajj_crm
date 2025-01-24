import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobListingComponent } from './job-listing.component';

const routes: Routes = [
  {
    path: 'job-application',
    component: JobListingComponent,
    data: { type: 'job-application' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Use forChild for lazy-loaded routes
  exports: [RouterModule],
})
export class jobListingRoutingModule {}
