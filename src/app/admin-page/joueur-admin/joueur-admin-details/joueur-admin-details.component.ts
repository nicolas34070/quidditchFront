import {Component, Input, OnInit} from '@angular/core';
import {Joueur} from '../../../models/Joueur';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JoueurDataService} from '../../../services/joueur-data.service';
import {Pays} from '../../../models/Pays';
import {PaysDataService} from '../../../services/pays-data.service';
import {EquipeDataService} from '../../../services/equipe-data.service';
import {Equipe} from '../../../models/Equipe';
import {PosteDataService} from '../../../services/poste-date.service';
import {Poste} from '../../../models/Poste';
import {Niveau} from '../../../models/Niveau';
import {NiveauDataService} from '../../../services/niveau-data.service';


@Component({
  selector: 'app-joueur-admin-details',
  templateUrl: './joueur-admin-details.component.html',
  styleUrls: ['./joueur-admin-details.component.css']
})
export class JoueurAdminDetailsComponent implements OnInit {

  @Input() oldJoueur?: Joueur;

  angForm: FormGroup;

  nationaliteList: Pays[] = [];
  defaultnationalite: number;

  equipeList: Equipe[] = [];
  defaultequipe: number;

  defaultposte: number;
  posteList: Poste[] = [];

  defaultNiveau: number;
  niveauList: Niveau[] = [];

  errorMessage = 'une erreur est survenue';

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private joueurDataService: JoueurDataService,
              private paysDataService: PaysDataService,
              private equipeDataService: EquipeDataService, private posteDataService: PosteDataService,
              private niveauDataService: NiveauDataService) {
                this.createForm();
              }

  createForm() {
    this.angForm = this.fb.group({
      nom: ['', Validators.required ],
      poste: ['', Validators.required ],
      nationalite: ['', Validators.required ],
      equipe: ['', Validators.required ],
      age:  ['', Validators.required ],
      league: ['', Validators.required ]
    });
  }


  ngOnInit() {
    this.paysDataService.getAllPays().subscribe((pays: Pays[]) => {
      this.nationaliteList = pays;
      this.defaultnationalite =  this.oldJoueur != null ? this.oldJoueur.nationalite.idPays : this.nationaliteList[0].idPays;
    });

    this.equipeDataService.getEquipes().subscribe((equipes: Equipe[]) => {
      this.equipeList = equipes;
      this.defaultequipe =  this.oldJoueur != null ? this.oldJoueur.equipe.idEquipe : this.equipeList[0].idEquipe;
    });

    this.posteDataService.getPostes().subscribe((equipes: Poste[]) => {
      this.posteList = equipes;
      this.defaultposte =  this.oldJoueur != null ? this.oldJoueur.poste.idPoste : this.posteList[0].idPoste;
    });

    this.niveauDataService.getNiveaux().subscribe((niveaux: Niveau[]) => {
      this.niveauList = niveaux;
      this.defaultNiveau =  this.oldJoueur != null ? this.oldJoueur.league.idNiveau : this.niveauList[0].idNiveau;
    });
  }


  save() {

    const joueur = Joueur.mapToJoueur(this.angForm.value);


    // we can't get object from select, so we re-assign the ID to each object.
    joueur.nationalite.idPays = this.angForm.value.nationalite;
    joueur.poste.idPoste = this.angForm.value.poste;
    joueur.equipe.idEquipe = this.angForm.value.equipe;
    joueur.league.idNiveau = this.angForm.value.league;

    if (this.oldJoueur != null) {
      joueur.idJoueur = this.oldJoueur.idJoueur;
      this.joueurDataService.updateJoueur(joueur).subscribe(() => {
        this.activeModal.close();
      });
    } else {
      this.joueurDataService.addJoueur(joueur).subscribe(() => {
        this.activeModal.close();
      });
    }
  }

  delete() {
    this.joueurDataService.deleteJoueur(this.oldJoueur).subscribe((joueur: Joueur) => {
      this.activeModal.close();
    });
  }

}
