import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginSingupRoutingModule } from './login-singup-routing.module';
import { LognComponent } from '../logn/logn.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LognComponent
  ],
  imports: [
    CommonModule,
    LoginSingupRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    LognComponent
  ]
})
export class LoginSingupModule { }
