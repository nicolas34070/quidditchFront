import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import {CommonModule} from "@angular/common";
import {NavbarreComponent} from "./navbarre/navbarre.component";
import {SidebarComponent} from "./sidebar/sidebar.component";



@NgModule({
  declarations: [
    NavbarreComponent,
    SidebarComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule
  ],
  exports: [
    NavbarreComponent,
    SidebarComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class CoreModule { }
