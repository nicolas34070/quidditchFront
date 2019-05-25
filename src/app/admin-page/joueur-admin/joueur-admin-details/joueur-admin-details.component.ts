import {Component, Input, OnInit} from '@angular/core';
import {Joueur} from "../../../models/Joueur";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {JoueurDataService} from "../../../services/joueur-data.service";
import {Pays} from "../../../models/Pays";
import {PaysDataService} from "../../../services/pays-data.service";
import {EquipeDataService} from "../../../services/equipe-data.service";
import {Equipe} from "../../../models/Equipe";
import {PosteDataService} from "../../../services/poste-date.service";
import {Poste} from "../../../models/Poste";

@Component({
  selector: 'app-joueur-admin-details',
  templateUrl: './joueur-admin-details.component.html',
  styleUrls: ['./joueur-admin-details.component.css']
})
export class JoueurAdminDetailsComponent implements OnInit {

  @Input() oldJoueur?: Joueur;

  angForm: FormGroup;

  nationaliteList: Pays[] = [];
  defaultnationalite = Pays;

  equipeList: Equipe[] = [];
  defaultequipe = Equipe;

  defaultposte = Poste;
  posteList: Poste[] = [];

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, public joueurDataService: JoueurDataService,
              public paysDataService: PaysDataService, public equipeDataService: EquipeDataService, public posteDataService: PosteDataService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      nom: ['', Validators.required ],
      poste: ['', Validators.required ],
      nationalite: ['', Validators.required ],
      equipe: ['', Validators.required ]
    });
  }


  ngOnInit() {
    this.paysDataService.getAllPays().subscribe((pays: Pays[]) => {
      this.nationaliteList = pays;
      this.defaultnationalite =  this.oldJoueur != null ? this.oldJoueur.nationalite : this.nationaliteList[0];
    });

    this.equipeDataService.getEquipes().subscribe((equipes: Equipe[]) => {
      this.equipeList = equipes;
      this.defaultequipe =  this.oldJoueur != null ? this.oldJoueur.equipe : this.equipeList[0];
    });

    this.posteDataService.getPostes().subscribe((equipes: Poste[]) => {
      this.posteList = equipes;
      this.defaultposte =  this.oldJoueur != null ? this.oldJoueur.poste : this.posteList[0];
    });
  }


  save() {
    console.log(this.angForm.value);
    let joueur = Joueur.mapToJoueur(this.angForm.value);

    if (this.oldJoueur != null) {
      joueur.idJoueur = this.oldJoueur.idJoueur;
      this.joueurDataService.updateJoueur(joueur).subscribe((joueur: Joueur) => {
        this.activeModal.close();
      });
    } else {
      this.joueurDataService.addJoueur(joueur).subscribe((joueur: Joueur) => {
        this.activeModal.close();
      });
    }
  }

  delete() {
    this.joueurDataService.deleteJoueur(this.oldJoueur).subscribe((joueur: Joueur) => {
      this.activeModal.close()
    });
  }

}
