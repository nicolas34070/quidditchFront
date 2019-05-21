import { NgModule } from '@angular/core';
import {UserDataService} from "./user-data.service";
import {MatchDataService} from "./match-data.service";



@NgModule({
  imports: [
  ],
  providers: [
    UserDataService,
    MatchDataService
  ]
})

export class ServicesModule { }
