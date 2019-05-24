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



@NgModule({
  declarations: [
    AdminPageComponent,
    TournoiAdminComponent
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
    TournoiDataService
  ]
})

export class AdminPageModule { }
