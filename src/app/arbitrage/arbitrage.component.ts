import { Component, OnInit } from '@angular/core';
import {Match} from "../models/Match";
import {MatchDataService} from "../services/match-data.service";
import * as moment from 'moment';

@Component({
  selector: 'app-arbitrage',
  templateUrl: './arbitrage.component.html',
  styleUrls: ['./arbitrage.component.css']
})
export class ArbitrageComponent implements OnInit {


  public matchesList: Match[] = [];
  public provisoireIdArbitre : string = "1";

  constructor(public matchDataService: MatchDataService) { }

  async ngOnInit() {
    this.matchDataService.getMatchsByArbitre(this.provisoireIdArbitre).subscribe((matches: Match[]) => {

      matches.map(match => {
        if (match.dateFin == null ) {
          if (match.dateDebut.format("DD/MM/YYY") <= (moment().format("DD/MM/YYY"))) {
            this.matchesList.push(match)
          }
        }
      } );
    });
  }

}
