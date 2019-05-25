import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Tournoi} from "../../../models/Tournoi";
import {TournoiDataService} from "../../../services/tournoi-date.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Pays} from "../../../models/Pays";
import {PaysDataService} from "../../../services/pays-data.service";
import {DateAdapter} from "@angular/material";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tournoi-admin-details',
  templateUrl: './tournoi-admin-add.component.html',
  styleUrls: ['./tournoi-admin-add.component.css']
})
export class TournoiAdminAddComponent implements OnInit {

  @Input() oldTournoi?: Tournoi;

  paysList: Pays[] = [];
  default = Pays;
  defaultOldDateDebut = " ";
  defaultOldDateFin;


  angForm: FormGroup;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, public paysDataService: PaysDataService, public tournoiDataService: TournoiDataService, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('fr');
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      nom: ['', Validators.required ],
      dateDebut: ['', Validators.required ],
      dateFin: ['' , Validators.nullValidator(null)],
      pays: ['', Validators.required ]
    });
  }


  async ngOnInit() {

    if (this.oldTournoi != null) {
      if (this.oldTournoi.dateDebut) {
        this.defaultOldDateDebut = this.oldTournoi.dateDebut.toISOString();
      }
      if (this.oldTournoi.dateFin) {
        this.defaultOldDateFin = this.oldTournoi.dateFin.toISOString();
      }
    }

    this.paysDataService.getAllPays().subscribe((pays: Pays[]) => {
      this.paysList = pays;
      this.default =  this.oldTournoi != null ? this.oldTournoi.pays : this.paysList[0];
    });
  }


  save() {
    console.log(this.angForm.value);
     let tournoi = Tournoi.mapToTournoi(this.angForm.value);

      if (this.oldTournoi != null) {
        tournoi.idTournoi = this.oldTournoi.idTournoi;

          this.tournoiDataService.updateTournoi(tournoi).subscribe((tournoi: Tournoi) => {
            this.activeModal.close();
          });
      } else {
        this.tournoiDataService.addTournoi(tournoi).subscribe((tournoi: Tournoi) => {
          this.activeModal.close();
        });
      }
  }

  delete() {
    this.tournoiDataService.deleteTournoi(this.oldTournoi).subscribe((tournoi: Tournoi) => {
      this.activeModal.close()
    });
  }
}
