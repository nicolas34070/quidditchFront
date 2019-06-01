import { Component, OnInit } from '@angular/core';
import {MatchDataService} from "../services/match-data.service";
import {Match} from "../models/Match";
import {ActivatedRoute} from "@angular/router";
import * as moment from 'moment';
import {MatchStore} from "../services/match-data-tournoi-observable";

@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.css']
})
export class MatchPageComponent implements OnInit {

  public MatchsListEnCours: Match[] = [];
  public MatchsListFinis: Match[] = [];
  public MatchsListAVenir: Match[] = [];
  public id: string = "0";

  constructor(private route: ActivatedRoute, private matchDataService: MatchStore) {
  }

  async ngOnInit() {
    this.onChangeData();
  }



  onChangeData() {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      this.matchDataService.matchs.subscribe((matches: Match[]) => {
        matches.map(match => {
            if (match.dateFin == null ) {
              if ( (moment() > match.dateDebut)) {
                this.MatchsListEnCours.push(match);
              } else {
                this.MatchsListAVenir.push(match);

              }
            } else {
              this.MatchsListFinis.push(match);
            }
          }
        );
      });
    });

    this.matchDataService.loadInitialData(this.id);
  }

}
