import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Tournoi} from '../../../models/Tournoi';
import {TournoiDataService} from '../../../services/tournoi-date.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Pays} from '../../../models/Pays';
import {PaysDataService} from '../../../services/pays-data.service';
import {DateAdapter} from '@angular/material';
import {RouteConfigLoadEnd, Router} from '@angular/router';


@Component({
  selector: 'app-tournoi-admin-details',
  templateUrl: './tournoi-admin-add.component.html',
  styleUrls: ['./tournoi-admin-add.component.css']
})
export class TournoiAdminAddComponent implements OnInit {

  @Input() oldTournoi?: Tournoi;

  paysList: Pays[] = [];
  default: number;
  defaultOldDateDebut = ' ';
  defaultOldDateFin;
  errorMessage = 'une erreur est survenue';


  angForm: FormGroup;

  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal, private paysDataService: PaysDataService,
              private tournoiDataService: TournoiDataService, private dateAdapter: DateAdapter<Date>, private router: Router) {
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
      this.default =  this.oldTournoi != null ? this.oldTournoi.pays.idPays : this.paysList[0].idPays;
    });
  }


  save() {
     const tournoi = Tournoi.mapToTournoi(this.angForm.value);
     tournoi.pays.idPays = this.angForm.value.pays;

     if (this.oldTournoi != null) {
        tournoi.idTournoi = this.oldTournoi.idTournoi;

        this.tournoiDataService.updateTournoi(tournoi).subscribe(() => {
            this.activeModal.close();
          });
      } else {
        this.tournoiDataService.addTournoi(tournoi).subscribe(() => {
          this.activeModal.close();
        });
      }
  }

  delete() {
    this.tournoiDataService.deleteTournoi(this.oldTournoi).subscribe(() => {
      this.activeModal.close();
    });
  }
}
