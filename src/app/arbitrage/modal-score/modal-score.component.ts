import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Match} from "../../models/Match";
import {MatchDataService} from "../../services/match-data.service";

@Component({
  selector: 'app-modal-score',
  templateUrl: './modal-score.component.html',
  styleUrls: ['./modal-score.component.css']
})
export class ModalScoreComponent implements OnInit {

  @Input()match: Match;

  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor( public activeModal: NgbActiveModal, public matchDataService: MatchDataService) { }

  ngOnInit() {
  }

  saveScore() {
    this.passEntry.emit(this.match);
    this.matchDataService.updateMatchScore(this.match).subscribe((matches: Match) => {
      this.activeModal.dismiss();
    });
  }
}
