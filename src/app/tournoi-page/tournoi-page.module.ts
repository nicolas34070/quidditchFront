import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import {CommonModule} from "@angular/common";
import {TournoiPageComponent} from "./tournoi-page.component";
import {TournoiDataService} from "../services/tournoi-date.service";



@NgModule({
  declarations: [
    TournoiPageComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule
  ],
  exports: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    TournoiDataService,
  ]
})

export class TournoiPageModule { }
