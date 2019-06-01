import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import {CommonModule} from "@angular/common";
import {TournoiPageComponent} from "./tournoi-page.component";
import {CoreModule} from "../core/core.module";
import {MaterialModule} from "../material-app.module";
import {ServicesModule} from "../services/service.module";



@NgModule({
  declarations: [
    TournoiPageComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    CoreModule,
    MaterialModule,
    ServicesModule
  ],
  exports: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [

  ]
})

export class TournoiPageModule { }
