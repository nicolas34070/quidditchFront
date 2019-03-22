import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MatchPageComponent } from './match-page/match-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarreComponent } from './navbarre/navbarre.component';
import { ArbitrageComponent } from './arbitrage/arbitrage.component';


const appRoutes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path:'', component: MatchPageComponent},
  {path:'arbitrage', component: ArbitrageComponent}

 

 ]

@NgModule({
  declarations: [
    AppComponent,
    MatchPageComponent,
    LoginPageComponent,
    NavbarreComponent,
    ArbitrageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
