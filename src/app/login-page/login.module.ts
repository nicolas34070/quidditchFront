import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import {LoginPageComponent} from "./login-page.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "../core/core.module";
import {MaterialModule} from "../material-app.module";
import {ServicesModule} from "../services/service.module";



@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    MaterialModule,
    ServicesModule

  ],
  exports: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class LoginModule { }
