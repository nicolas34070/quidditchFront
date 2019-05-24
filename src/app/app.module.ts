import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { CommonModule } from "@angular/common";

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatchPageModule} from "./match-page/match-page.module";
import {LoginModule} from "./login-page/login.module";
import {ArbitrageModule} from "./arbitrage/arbitrage.module";
import {HttpClientModule} from "@angular/common/http";
import {CoreModule} from "./core/core.module";
import {TournoiPageModule} from "./tournoi-page/tournoi-page.module";
import {ModalScoreComponent} from "./ui-component/modal/modal-score/modal-score.component";
import {AdminPageModule} from "./admin-page/admin-page.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatNativeDateModule} from "@angular/material";


@NgModule({
  declarations: [
    AppComponent,
    ModalScoreComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,


    FormsModule,
    MatchPageModule,
    LoginModule,
    ArbitrageModule,
    CoreModule,
    TournoiPageModule,
    AdminPageModule,

    CommonModule,
    
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
