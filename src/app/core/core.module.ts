import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import {CommonModule} from "@angular/common";
import {ModalComponent} from "./modal/modal.component";
import {NavbarreComponent} from "./navbarre/navbarre.component";



@NgModule({
  declarations: [
    ModalComponent,
    NavbarreComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule
  ],
  exports: [
    ModalComponent,
    NavbarreComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class CoreModule { }
