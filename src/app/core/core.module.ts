import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import {CommonModule} from "@angular/common";
import {NavbarreComponent} from "./navbarre/navbarre.component";



@NgModule({
  declarations: [
    NavbarreComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule
  ],
  exports: [
    NavbarreComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class CoreModule { }
