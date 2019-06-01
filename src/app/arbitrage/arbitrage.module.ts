import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import {ArbitrageComponent} from "./arbitrage.component";
import {CommonModule} from "@angular/common";
import {MatchDataService} from "../services/match-data.service";
import {CoreModule} from "../core/core.module";
import {ModalModule} from "../ui-component/modal/modal.module";
import {ModalScoreComponent} from "../match-page/modal-score/modal-score.component";
import {FormsModule} from "@angular/forms";
import {ServicesModule} from "../services/service.module";
import {MaterialModule} from "../material-app.module";



@NgModule({
  declarations: [
    ArbitrageComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    CoreModule,
    ModalModule,
    FormsModule,
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

export class ArbitrageModule { }
