import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import {CommonModule} from "@angular/common";
import {CoreModule} from "../core/core.module";
import {ModalModule} from "../ui-component/modal/modal.module";
import {AdminPageComponent} from "./admin-page.component";
import {TournoiAdminComponent} from "./tournoi-admin/tournoi-admin.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from "../material-app.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {MatchAdminComponent} from "./match-admin/match-admin.component";
import { JoueurAdminComponent } from './joueur-admin/joueur-admin.component';
import { EquipeAdminComponent } from './equipe-admin/equipe-admin.component';
import { ArbitreAdminComponent } from './arbitre-admin/arbitre-admin.component';
import { TerrainAdminComponent } from './terrain-admin/terrain-admin.component';
import { PaysAdminComponent } from './pays-admin/pays-admin.component';
import {ServicesModule} from "../services/service.module";



@NgModule({
  declarations: [
    AdminPageComponent,
    TournoiAdminComponent,
    MatchAdminComponent,
    JoueurAdminComponent,
    EquipeAdminComponent,
    ArbitreAdminComponent,
    TerrainAdminComponent,
    PaysAdminComponent
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
    ServicesModule

  ],
  exports: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    ServicesModule
  ]
})

export class AdminPageModule { }
