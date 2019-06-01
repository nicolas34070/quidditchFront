import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import {MatchPageComponent} from "./match-page.component";
import {MatchDataService} from "../services/match-data.service";
import {CommonModule} from "@angular/common";
import {CoreModule} from "../core/core.module";
import {MaterialModule} from "../material-app.module";
import {ModalScoreComponent} from "./modal-score/modal-score.component";
import {FormsModule} from "@angular/forms";
import {ServicesModule} from "../services/service.module";



@NgModule({
  declarations: [
    MatchPageComponent,
    ModalScoreComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ServicesModule
  ],
  exports: [
    ModalScoreComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
  ]
})

export class MatchPageModule { }
