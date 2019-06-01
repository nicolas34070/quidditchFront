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
import { PaysAdminDetailsComponent } from './pays-admin/pays-admin-details/pays-admin-details.component';
import { ArbitreAdminDetailsComponent } from './arbitre-admin/arbitre-admin-details/arbitre-admin-details.component';
import { EquipeAdminDetailsComponent } from './equipe-admin/equipe-admin-details/equipe-admin-details.component';
import { JoueurAdminDetailsComponent } from './joueur-admin/joueur-admin-details/joueur-admin-details.component';
import { MatchAdminDetailsComponent } from './match-admin/match-admin-details/match-admin-details.component';
import { TerrainAdminDetailsComponent } from './terrain-admin/terrain-admin-details/terrain-admin-details.component';
import { TournoiAdminAddComponent } from './tournoi-admin/tournoi-admin-add/tournoi-admin-add.component';



@NgModule({
  declarations: [
    AdminPageComponent,
    TournoiAdminComponent,
    MatchAdminComponent,
    JoueurAdminComponent,
    EquipeAdminComponent,
    ArbitreAdminComponent,
    TerrainAdminComponent,
    PaysAdminComponent,
    PaysAdminDetailsComponent,
    ArbitreAdminDetailsComponent,
    EquipeAdminDetailsComponent,
    JoueurAdminDetailsComponent,
    MatchAdminDetailsComponent,
    TerrainAdminDetailsComponent,
    TournoiAdminAddComponent,
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
    TournoiAdminAddComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
  ]
})

export class AdminPageModule { }
