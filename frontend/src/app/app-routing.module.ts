import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./auth.guard";
const routes: Routes = [

  {
    path: '',
    redirectTo : 'auth/login',
    pathMatch : 'full'
  },
  {
    path: 'admin',
    canActivate: [AuthGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'user',
    canActivate: [AuthGuard], loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
