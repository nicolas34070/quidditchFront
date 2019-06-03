import {Component,  Input} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ModalScoreComponent} from '../../arbitrage/modal-score/modal-score.component';
import {TournoiAdminAddComponent} from '../../admin-page/tournoi-admin/tournoi-admin-add/tournoi-admin-add.component';



@Component({
  selector: 'ngbd-modal-focus',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']

})
export class NgbdModalFocus {

  // --------------------------------------------
  //           INPUTS
  // --------------------------------------------

  @Input() placeholder: string = 'Hello';
  @Input() content: object;

  @Input() active = 'score';

  constructor(private modalService: NgbModal) {
  }


  open(name: string) {
    switch (name) {
      case 'score':
        var modalRef =  this.modalService.open(ModalScoreComponent);
        modalRef.componentInstance.match = this.content ;
        modalRef. result.then(() => { console.log('When user closes'); }, () => { console.log('Backdrop click'); });

        break;
      case 'tournois':
        var modalRef =  this.modalService.open(TournoiAdminAddComponent);
        modalRef.componentInstance.oldTournoi = this.content ;
        modalRef. result.then(() => { console.log('When user closes'); }, () => { console.log('Backdrop click'); });

        break;

      default:

    }
  }
}
