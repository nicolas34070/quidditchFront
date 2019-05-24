import {Component, Input} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Match} from "../../models/Match";
import {ModalScoreComponent} from "../../arbitrage/modal-score/modal-score.component";



@Component({
  selector: 'ngbd-modal-focus',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']

})
export class NgbdModalFocus {

  // --------------------------------------------
  //           INPUTS
  // --------------------------------------------

  @Input() placeholder: String = "Hello";
  @Input() content: Match;

  constructor(private _modalService: NgbModal) {}

  open(name: string) {
    switch (name) {
      case 'score':
        const modalRef =  this._modalService.open(ModalScoreComponent);
        modalRef.componentInstance.match = this.content ;
        break;

      default:

    }


  }
}
