import { NgModule } from '@angular/core';
import {UserDataService} from "./user-data.service";
import {MatchDataService} from "./match-data.service";
import {TournoiDataService} from "./tournoi-date.service";



@NgModule({
  imports: [
  ],
  providers: [
    UserDataService,
    MatchDataService,
    TournoiDataService
  ]
})

export class ServicesModule { }
