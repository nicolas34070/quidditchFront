import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Match} from "../../models/Match";
import {ColorPaletteTypes} from "../../enums/color-palette";
import {ToasterService} from "../../core/services/toaster.service";
import {MatchStore} from "../../services/match-data-tournoi-observable";

@Component({
  selector: 'app-modal-score',
  templateUrl: './modal-score.component.html',
  styleUrls: ['./modal-score.component.css']
})
export class ModalScoreComponent implements OnInit {

  @Input() match: Match;

  errorMessage = "une erreur est survenue";

  constructor( public activeModal: NgbActiveModal, private matchDataService: MatchStore, private toasterService: ToasterService) { }

  ngOnInit() {
  }

  saveScore() {
    this.matchDataService.toggleMatch(this.match).subscribe((matches: Match) => {
      this.activeModal.dismiss();
    },
      error => {
        this.errorMessage = error.error;
        this.toasterService.displayToast(this.errorMessage, ColorPaletteTypes.warn, 3000);
      });
  }
}
