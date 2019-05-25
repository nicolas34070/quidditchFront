import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  NgbdModalFocus
} from './modal.component';
import {MatchDataService} from "../../services/match-data.service";
import {ModalScoreComponent} from "../../arbitrage/modal-score/modal-score.component";
import {TournoiAdminAddComponent} from "../../admin-page/tournoi-admin/tournoi-admin-add/tournoi-admin-add.component";
import {PaysAdminDetailsComponent} from "../../admin-page/pays-admin/pays-admin-details/pays-admin-details.component";
import {ArbitreAdminDetailsComponent} from "../../admin-page/arbitre-admin/arbitre-admin-details/arbitre-admin-details.component";

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdModalFocus],
  exports: [NgbdModalFocus],
  bootstrap: [NgbdModalFocus],
  entryComponents: [ModalScoreComponent, TournoiAdminAddComponent, PaysAdminDetailsComponent, ArbitreAdminDetailsComponent],
  providers: [
  MatchDataService,
]
})
export class ModalModule {}
