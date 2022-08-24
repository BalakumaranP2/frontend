import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LognComponent } from '../logn/logn.component';

const routes: Routes = [
  {path: '', component: LognComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginSingupRoutingModule { }
