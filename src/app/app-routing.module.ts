import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {MatchPageComponent} from "./match-page/match-page.component";
import {ArbitrageComponent} from "./arbitrage/arbitrage.component";


const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path:'', component: MatchPageComponent},
  {path:'arbitrage', component: ArbitrageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
