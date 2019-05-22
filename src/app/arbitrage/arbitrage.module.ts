import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import {ArbitrageComponent} from "./arbitrage.component";
import {CommonModule} from "@angular/common";
import {MatchDataService} from "../services/match-data.service";
import {CoreModule} from "../core/core.module";
import {ModalModule} from "../ui-component/modal/modal.module";



@NgModule({
  declarations: [
    ArbitrageComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    CoreModule,
    ModalModule
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

export class ArbitrageModule { }
