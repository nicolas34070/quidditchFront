import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {MatchPageComponent} from "./match-page/match-page.component";
import {ArbitrageComponent} from "./arbitrage/arbitrage.component";
import {TournoiPageComponent} from "./tournoi-page/tournoi-page.component";
import {AdminPageComponent} from "./admin-page/admin-page.component";
import {AuthGuardService} from "./core/services/auth-guard.service";


const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path:'', component: TournoiPageComponent},
  {path:'arbitre/:id', component: ArbitrageComponent, canActivate: [AuthGuardService]},
  {path:'match/:id', component: MatchPageComponent},
  {path:'admin', component: AdminPageComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
