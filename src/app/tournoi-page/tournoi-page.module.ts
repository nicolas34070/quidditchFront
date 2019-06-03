import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import {CommonModule} from '@angular/common';
import {TournoiPageComponent} from './tournoi-page.component';
import {TournoiDataService} from '../services/tournoi-date.service';
import {CoreModule} from '../core/core.module';
import {ServicesModule} from '../services/service.module';
import {MaterialModule} from '../material-app.module';



@NgModule({
  declarations: [
    TournoiPageComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    CoreModule,
    MaterialModule
  ],
  exports: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    TournoiDataService,
    ServicesModule
  ]
})

export class TournoiPageModule { }
