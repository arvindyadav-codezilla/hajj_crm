import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsFormComponent } from './groups-form.component';

const routes: Routes = [
  {
    path: 'groups',
    component: GroupsFormComponent,
    data: { type: 'groups' },
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule],
})
export class GroupsRoutingModule {}
