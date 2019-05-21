import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import {NavbarreComponent} from "./navbarre.component";



@NgModule({
  declarations: [
    NavbarreComponent
  ],
  imports: [
    AppRoutingModule,
  ],
  exports: [
    NavbarreComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class NavbarreModule { }
