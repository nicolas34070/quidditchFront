import { Component, OnInit } from '@angular/core';
import {MatchDataService} from "../services/match-data.service";
import {Match} from "../models/Match";
import {ActivatedRoute} from "@angular/router";
import * as moment from 'moment';

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
    this.matchDataService.getChannel().bind('update', (data : any[]) => {
      this.onChangeData();
    });

    this.onChangeData();
  }


  onChangeData() {

    var MatchsListFinisBis = [];
    var MatchsListEnCoursBis = [];
    var MatchsListAVenirBis = [];

    this.route.params.subscribe(params => {
      this.id = params['id']
      this.matchDataService.getMatchsByTournoi(this.id).subscribe((matches: Match[]) => {
        matches.map(match => {
            if (match.dateFin == null ) {
              if (match.dateDebut > (moment())) {
                MatchsListAVenirBis.push(match)
              } else {
                MatchsListEnCoursBis.push(match);

              }
            } else {
              MatchsListFinisBis.push(match);
            }
          }

        );

        this.MatchsListEnCours = MatchsListEnCoursBis;
        this.MatchsListAVenir = MatchsListAVenirBis;
        this.MatchsListFinis = MatchsListFinisBis;
      });


    });
  }

}
