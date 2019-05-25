import {Component, EventEmitter, Input, Output} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Match} from "../../models/Match";
import {ModalScoreComponent} from "../../arbitrage/modal-score/modal-score.component";
import {TournoiAdminAddComponent} from "../../admin-page/tournoi-admin/tournoi-admin-add/tournoi-admin-add.component";



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
  @Input() content: Object;

  @Input() active = "score";

  constructor(private _modalService: NgbModal) {
    console.log(this.active);
  }


  onChange(event) {
  }

  open(name: string) {
    switch (name) {
      case 'score':
        var modalRef =  this._modalService.open(ModalScoreComponent);
        modalRef.componentInstance.match = this.content ;
        break;
      case 'tournois':
        var modalRef =  this._modalService.open(TournoiAdminAddComponent);
        modalRef.componentInstance.match = this.content ;
        break;

      default:

    }
  }
}
