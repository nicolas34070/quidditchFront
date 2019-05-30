import { Component, OnInit } from '@angular/core';
import {Match} from "../models/Match";
import {MatchDataService} from "../services/match-data.service";
import * as moment from 'moment';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-arbitrage',
  templateUrl: './arbitrage.component.html',
  styleUrls: ['./arbitrage.component.css']
})
export class ArbitrageComponent implements OnInit {


  public matchesList: Match[] = [];
  public id : string = "1";

  constructor(private route: ActivatedRoute, private matchDataService: MatchDataService) { }

  async ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id']

      this.matchDataService.getMatchsByArbitre(this.id).subscribe((matches: Match[]) => {

        matches.map(match => {
          if (match.dateFin == null ) {
            if (match.dateDebut.format("DD/MM/YYY") <= (moment().format("DD/MM/YYY"))) {
              this.matchesList.push(match)
            }
          }
        } );
      });
    });



  }

}
