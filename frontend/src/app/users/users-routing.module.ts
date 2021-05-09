import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserhomeComponent } from './userhome/userhome.component';

const routes: Routes = [
  { path: 'dashboard', component: UserhomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
