import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import {MatchPageComponent} from "./match-page.component";
import {MatchDataService} from "../services/match-data.service";
import {CommonModule} from "@angular/common";
import {CoreModule} from "../core/core.module";
import {ServicesModule} from "../services/service.module";
import {MaterialModule} from "../material-app.module";



@NgModule({
  declarations: [
    MatchPageComponent
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

export class MatchPageModule { }
