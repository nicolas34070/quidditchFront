import { NgModule } from '@angular/core';
import {UserDataService} from './user-data.service';
import {MatchDataService} from './match-data.service';
import {TournoiDataService} from './tournoi-date.service';
import {EquipeDataService} from './equipe-data.service';
import {JoueurDataService} from './joueur-data.service';
import {TerrainDataService} from './terrain-data.service';
import {PaysDataService} from './pays-data.service';
import {PosteDataService} from './poste-date.service';
import {PusherService} from './pusher.service';



@NgModule({
  imports: [
  ],
  providers: [
    UserDataService,
    MatchDataService,
    TournoiDataService,
    EquipeDataService,
    JoueurDataService,
    TerrainDataService,
    PaysDataService,
    PosteDataService,
    PusherService
  ]
})

export class ServicesModule { }
