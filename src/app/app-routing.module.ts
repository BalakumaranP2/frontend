import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Home/home/home.component';
import { ViewDetailsComponent } from './View/view-details/view-details.component';

const routes: Routes = [
  {path: 'login', loadChildren: () => import('./Login/login-singup/login-singup.module').then(m => m.LoginSingupModule)},
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'view', component: ViewDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
