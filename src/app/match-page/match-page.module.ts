import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import {MatchPageComponent} from "./match-page.component";
import {MatchDataService} from "../services/match-data.service";
import {UserDataService} from "../services/user-data.service";
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    MatchPageComponent
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
    MatchDataService,
  ]
})

export class MatchPageModule { }
