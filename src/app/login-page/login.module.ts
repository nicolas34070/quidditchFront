import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import {LoginPageComponent} from "./login-page.component";



@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    AppRoutingModule,
  ],
  exports: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class LoginModule { }
