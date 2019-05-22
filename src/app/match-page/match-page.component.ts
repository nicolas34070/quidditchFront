import { Component, OnInit } from '@angular/core';
import {UserDataService} from "../services/user-data.service";
import {User} from "../models/User";
import {MatchDataService} from "../services/match-data.service";
import {Match} from "../models/Match";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.css']
})
export class MatchPageComponent implements OnInit {

  public matchesList: Match[] = [];
  public id: string = "0";

  constructor(private route: ActivatedRoute, public matchDataService: MatchDataService) { }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.matchDataService.getMatchsByTournoi(this.id).subscribe((matches: Match[]) => {
        console.log(matches);
        this.matchesList = matches;
      });
    });

    this.matchDataService.getMatchsByTournoi().subscribe((matches: Match[]) => {
      console.log(matches);
      this.matchesList = matches;
     });
  }
}
