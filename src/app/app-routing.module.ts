import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {MatchPageComponent} from "./match-page/match-page.component";
import {ArbitrageComponent} from "./arbitrage/arbitrage.component";
import {TournoiPageComponent} from "./tournoi-page/tournoi-page.component";
import {TournoiAdminComponent} from "./admin-page/tournoi-admin/tournoi-admin.component";


const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path:'', component: TournoiPageComponent},
  {path:'arbitrage', component: ArbitrageComponent},
  {path:'match/:id', component: MatchPageComponent},
  {path:'admin', component: TournoiAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
