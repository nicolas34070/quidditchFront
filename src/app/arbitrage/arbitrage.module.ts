import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import {ArbitrageComponent} from './arbitrage.component';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../core/core.module';
import {ModalModule} from '../ui-component/modal/modal.module';
import {ModalScoreComponent} from './modal-score/modal-score.component';
import {FormsModule} from '@angular/forms';
import {ServicesModule} from '../services/service.module';
import {MaterialModule} from '../material-app.module';



@NgModule({
  declarations: [
    ArbitrageComponent,
    ModalScoreComponent
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
    ModalScoreComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
  ]
})

export class ArbitrageModule { }
