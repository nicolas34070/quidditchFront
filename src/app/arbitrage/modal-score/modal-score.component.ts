import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Match} from "../../models/Match";
import {MatchDataService} from "../../services/match-data.service";
import {ColorPaletteTypes} from "../../enums/color-palette";
import {ToasterService} from "../../core/services/toaster.service";

@Component({
  selector: 'app-modal-score',
  templateUrl: './modal-score.component.html',
  styleUrls: ['./modal-score.component.css']
})
export class ModalScoreComponent implements OnInit {

  @Input()match: Match;

  errorMessage = "une erreur est survenue";

  constructor( public activeModal: NgbActiveModal, public matchDataService: MatchDataService, private toasterService: ToasterService) { }

  ngOnInit() {
  }

  saveScore() {
    this.matchDataService.updateMatchScore(this.match).subscribe((matches: Match) => {
      this.activeModal.dismiss();
    },
      error => {
        this.errorMessage = error.error;
        this.toasterService.displayToast(this.errorMessage, ColorPaletteTypes.warn, 3000);
      });
  }
}
