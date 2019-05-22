import { Component, OnInit } from '@angular/core';
import {UserDataService} from "../services/user-data.service";
import {User} from "../models/User";
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

  constructor(private route: ActivatedRoute, public matchDataService: MatchDataService) { }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']


      this.matchDataService.getMatchsByTournoi(this.id).subscribe((matches: Match[]) => {
        matches.map(match => {
          if (match.dateFin == null ) {
            console.log(moment().format("DD/MM/YYY"))
            if (match.dateDebut.format("DD/MM/YYY") > (moment().format("DD/MM/YYY"))) {
              this.MatchsListAVenir.push(match)
            } else {
              this.MatchsListEnCours.push(match);

            }
          } else {
            this.MatchsListFinis.push(match);
          }
        } );
      });
    });



  }
}
