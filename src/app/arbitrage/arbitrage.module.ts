import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import {ArbitrageComponent} from "./arbitrage.component";



@NgModule({
  declarations: [
    ArbitrageComponent
  ],
  imports: [
    AppRoutingModule,
  ],
  exports: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class ArbitrageModule { }
