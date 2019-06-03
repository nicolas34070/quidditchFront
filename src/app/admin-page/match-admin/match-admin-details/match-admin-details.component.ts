import {Component, Input, OnInit} from '@angular/core';
import {Match} from '../../../models/Match';
import {Terrain} from '../../../models/Terrain';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TerrainDataService} from '../../../services/terrain-data.service';
import {DateAdapter} from '@angular/material';
import {MatchDataService} from '../../../services/match-data.service';
import {EquipeDataService} from '../../../services/equipe-data.service';
import {Equipe} from '../../../models/Equipe';
import {Tournoi} from '../../../models/Tournoi';
import {TournoiDataService} from '../../../services/tournoi-date.service';
import {UserDataService} from '../../../services/user-data.service';
import {User} from '../../../models/User';


@Component({
  selector: 'app-match-admin-details',
  templateUrl: './match-admin-details.component.html',
  styleUrls: ['./match-admin-details.component.css']
})
export class MatchAdminDetailsComponent implements OnInit {

  @Input() oldMatch?: Match;

  terrainList: Terrain[] = [];
  defaultTerrain: number;

  premiereEquipeList: Equipe[] = [];
  defaultPremiereEquipe: number;

  deuxiemeEquipeList: Equipe[] = [];
  defaultDeuxiemeEquipe: number;


  tournoiList: Tournoi[] = [];
  defaultTournoi: number;


  arbitreList: User[] = [];
  defaultArbitre: number;

  defaultOldDateDebut = ' ';
  defaultOldDateFin;


  angForm: FormGroup;
  errorMessage = 'une erreur est survenue';

  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal, private arbitreDataService: UserDataService,
              private tournoiDataService: TournoiDataService, private equipeDataService: EquipeDataService,
              private terrainDataService: TerrainDataService, private matchDataService: MatchDataService,
              private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('fr');
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      tournoi: ['', Validators.required ],
      premiereEquipe: ['', Validators.required ],
      deuxiemeEquipe: ['', Validators.required ],
      arbitre: ['', Validators.required ],
      dateDebut: ['', Validators.required ],
      dateFin: ['' , Validators.nullValidator(null)],
      terrain: ['', Validators.required ]
    });
  }


  async ngOnInit() {

    if (this.oldMatch != null) {
      if (this.oldMatch.dateDebut) {
        this.defaultOldDateDebut = this.oldMatch.dateDebut.toISOString();
      }
      if (this.oldMatch.dateFin) {
        this.defaultOldDateFin = this.oldMatch.dateFin.toISOString();
      }
    }

    this.arbitreDataService.getArbitres().subscribe((arbitres: User[]) => {
      this.arbitreList = arbitres;
      this.defaultArbitre =  this.oldMatch != null ? this.oldMatch.arbitre.idUtilisateur : this.arbitreList[0].idUtilisateur;
    });

    this.terrainDataService.getTerrains().subscribe((terrain: Terrain[]) => {
      this.terrainList = terrain;
      this.defaultTerrain =  this.oldMatch != null ? this.oldMatch.terrain.idTerrain : this.terrainList[0].idTerrain;
    });


    this.tournoiDataService.getTournois().subscribe((tournois: Tournoi[]) => {
      this.tournoiList = tournois;
      this.defaultTournoi =  this.oldMatch != null ? this.oldMatch.tournoi.idTournoi : this.tournoiList[0].idTournoi;
    });

    this.equipeDataService.getEquipes().subscribe((equipes: Equipe[]) => {
      this.premiereEquipeList = equipes;
      this.deuxiemeEquipeList = equipes;

      this.defaultDeuxiemeEquipe =  this.oldMatch != null ? this.oldMatch.premiereEquipe.idEquipe : this.premiereEquipeList[0].idEquipe;
      this.defaultPremiereEquipe =  this.oldMatch != null ? this.oldMatch.deuxiemeEquipe.idEquipe : this.premiereEquipeList[1].idEquipe;
    });
  }


  save() {

    const match = Match.mapToMatchWithForm(this.angForm.value);

    if (this.oldMatch != null) {
      match.idMatch = this.oldMatch.idMatch;

      this.matchDataService.updateMatch(match).subscribe((match: Match) => {
        this.activeModal.close();
      });
    } else {
      this.matchDataService.addMatch(match).subscribe((match: Match) => {
        this.activeModal.close();
      });
    }
  }

  delete() {
    this.matchDataService.deleteMatch(this.oldMatch).subscribe((match: Match) => {
      this.activeModal.close();
    });
  }
}
