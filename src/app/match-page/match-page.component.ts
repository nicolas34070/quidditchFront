import { Component, OnInit } from '@angular/core';
import {MatchDataService} from "../services/match-data.service";
import {Match} from "../models/Match";
import {ActivatedRoute} from "@angular/router";
import * as moment from 'moment';
import {Poste} from "../models/Poste";

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
  private interval: number;

  constructor(private route: ActivatedRoute, public matchDataService: MatchDataService) {
  }

  async ngOnInit() {

    // subscribe to pusher's event
    this.matchDataService.getChannel().bind('update', (data) => {
      var matchs = JSON.parse(data);
      this.onChangeData(matchs);
    });

    this.initialisationData();
  }


  initialisationData() {
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.matchDataService.getMatchsByTournoi(this.id).subscribe((matches: Match[]) => {
        matches.map(match => {
            if (match.dateFin == null ) {
              if (match.dateDebut > (moment())) {
                this.MatchsListAVenir.push(match);
              } else {
                this.MatchsListEnCours.push(match);

              }
            } else {
              this.MatchsListFinis.push(match);
            }
          }

        );
      });
    });
  }


  onChangeData($data) {
    var MatchsListFinisBis = [];
    var MatchsListEnCoursBis = [];
    var MatchsListAVenirBis = [];

    $data.map(data => {
            var match = Match.mapToMatch(data);
            if (match.dateFin == null ) {
              if (match.dateDebut > (moment())) {
                MatchsListAVenirBis.push(match)
              } else {
                MatchsListEnCoursBis.push(match);

              }
            } else {
              MatchsListFinisBis.push(match);
            }
          });

    this.MatchsListFinis = MatchsListFinisBis;
    this.MatchsListAVenir = MatchsListAVenirBis;
    this.MatchsListEnCours = MatchsListEnCoursBis;
  }

}
