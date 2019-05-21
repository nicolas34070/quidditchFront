import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";

import { FormsModule } from '@angular/forms';
import {NavbarreModule} from "./navbarre/navbarre.module";
import {MatchPageModule} from "./match-page/match-page.module";
import {LoginModule} from "./login-page/login.module";
import {ArbitrageModule} from "./arbitrage/arbitrage.module";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    FormsModule,
    NavbarreModule,
    MatchPageModule,
    LoginModule,
    ArbitrageModule,

    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
