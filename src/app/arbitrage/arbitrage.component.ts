import { Component, OnInit } from '@angular/core';
import {Match} from "../models/Match";
import {MatchDataService} from "../services/match-data.service";

@Component({
  selector: 'app-arbitrage',
  templateUrl: './arbitrage.component.html',
  styleUrls: ['./arbitrage.component.css']
})
export class ArbitrageComponent implements OnInit {


  public matchesList: Match[] = [];
  public provisoireIdArbitre : string = "4";

  constructor(public matchDataService: MatchDataService) { }

  async ngOnInit() {
    this.matchDataService.getMatchsByArbitre(this.provisoireIdArbitre).subscribe((matches: Match[]) => {
      console.log(matches);
      this.matchesList = matches;
    });
  }

}
