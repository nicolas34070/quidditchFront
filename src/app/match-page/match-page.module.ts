import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import {MatchPageComponent} from "./match-page.component";



@NgModule({
  declarations: [
    MatchPageComponent
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

export class MatchPageModule { }
