import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  NgbdModalFocus
} from './modal.component';
import {MatchDataService} from "../../services/match-data.service";
import {ModalScoreComponent} from "../../arbitrage/modal-score/modal-score.component";

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdModalFocus],
  exports: [NgbdModalFocus],
  bootstrap: [NgbdModalFocus],
  entryComponents: [ModalScoreComponent],
  providers: [
  MatchDataService,
]
})
export class ModalModule {}
