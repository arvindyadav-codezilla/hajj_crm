import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobApplicationComponent } from './jobApplication.component';


const routes: Routes = [
  {
    path: 'form',
    component: JobApplicationComponent,
    children: [
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  JobApplicationRoutingModule {}
