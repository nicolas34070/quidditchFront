import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { CommonModule } from "@angular/common";

import { FormsModule } from '@angular/forms';
import {MatchPageModule} from "./match-page/match-page.module";
import {LoginModule} from "./login-page/login.module";
import {ArbitrageModule} from "./arbitrage/arbitrage.module";
import {HttpClientModule} from "@angular/common/http";
import {CoreModule} from "./core/core.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    FormsModule,
    MatchPageModule,
    LoginModule,
    ArbitrageModule,
    CoreModule,

    CommonModule,
    
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
