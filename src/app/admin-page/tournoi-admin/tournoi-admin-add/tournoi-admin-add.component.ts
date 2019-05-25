import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Tournoi} from "../../../models/Tournoi";
import {TournoiDataService} from "../../../services/tournoi-date.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Pays} from "../../../models/Pays";
import {PaysDataService} from "../../../services/pays-data.service";
import {DateAdapter} from "@angular/material";

@Component({
  selector: 'app-tournoi-admin-details',
  templateUrl: './tournoi-admin-add.component.html',
  styleUrls: ['./tournoi-admin-add.component.css']
})
export class TournoiAdminAddComponent implements OnInit {

  @Input() tournoi: Tournoi;
  @Output()
  onChange: EventEmitter = new EventEmitter<any>();

  paysList: Pays[] = [];
  default = Pays;


  angForm: FormGroup;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, public paysDataService: PaysDataService, public tournoiDataService: TournoiDataService, private dateAdapter: DateAdapter<Date>) {

    this.dateAdapter.setLocale('fr');
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      nom: ['', Validators.required ],
      dateDebut: ['', Validators.required ],
      dateFin: ['' ],
      pays: ['', Validators.required ]
    });
  }


  async ngOnInit() {
    this.paysDataService.getAllPays().subscribe((pays: Pays[]) => {
      this.paysList = pays;
      this.default = this.paysList[0];
    });
  }


  save() {
     this.tournoi = Tournoi.mapToTournoi(this.angForm.value);
     this.tournoi.dateDebut = this.angForm.value.dateDebut.toISOString();

    this.tournoiDataService.addTournoi(this.tournoi).subscribe((tournoi: Tournoi) => {
      this.onCreated(true);
      this.activeModal.dismiss();
    });
  }

  onCreated(value: boolean) {
     this.onChange.emit(value);
  }

}
