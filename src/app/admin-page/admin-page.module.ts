import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import {CommonModule} from "@angular/common";
import {CoreModule} from "../core/core.module";
import {ModalModule} from "../ui-component/modal/modal.module";
import {AdminPageComponent} from "./admin-page.component";
import {TournoiAdminComponent} from "./tournoi-admin/tournoi-admin.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TournoiDataService} from "../services/tournoi-date.service";
import {MaterialModule} from "../material-app.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {MatchAdminComponent} from "./match-admin/match-admin.component";
import {MatchDataService} from "../services/match-data.service";
import { JoueurAdminComponent } from './joueur-admin/joueur-admin.component';
import { EquipeAdminComponent } from './equipe-admin/equipe-admin.component';
import { ArbitreAdminComponent } from './arbitre-admin/arbitre-admin.component';
import {EquipeDataService} from "../services/equipe-date.service";



@NgModule({
  declarations: [
    AdminPageComponent,
    TournoiAdminComponent,
    MatchAdminComponent,
    JoueurAdminComponent,
    EquipeAdminComponent,
    ArbitreAdminComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    CoreModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,

  ],
  exports: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    TournoiDataService,
    MatchDataService,
    EquipeDataService
  ]
})

export class AdminPageModule { }
