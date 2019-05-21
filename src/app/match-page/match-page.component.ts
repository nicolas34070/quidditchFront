import { Component, OnInit } from '@angular/core';
import {UserDataService} from "../services/user-data.service";
import {User} from "../models/User";
import {MatchDataService} from "../services/match-data.service";
import {Match} from "../models/Match";

@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.css']
})
export class MatchPageComponent implements OnInit {

  public matchesList: Match[] = [];

  constructor(public matchDataService: MatchDataService) { }

  async ngOnInit() {
    this.matchDataService.getMatchs().subscribe((matches: Match[]) => {
      console.log(matches);
      this.matchesList = matches;
     });
  }
}
