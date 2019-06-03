import { Component, OnInit } from '@angular/core';
import {Match} from "../models/Match";
import {MatchDataService} from "../services/match-data.service";
import * as moment from 'moment';
import {ActivatedRoute} from "@angular/router";
import {ColorPaletteTypes} from "../enums/color-palette";
import {ToasterService} from "../core/services/toaster.service";

@Component({
  selector: 'app-arbitrage',
  templateUrl: './arbitrage.component.html',
  styleUrls: ['./arbitrage.component.css']
})
export class ArbitrageComponent implements OnInit {


  public matchesList: Match[] = [];
  public id : string = "1";
  errorMessage = "une erreur est survenue";

  constructor(private route: ActivatedRoute, private matchDataService: MatchDataService, private toasterService: ToasterService) { }

  async ngOnInit() {


    this.route.params.subscribe(params => {
      this.id = params['id']

      this.matchDataService.getMatchsByArbitre(this.id).subscribe((matches: Match[]) => {
        matches.map(match => {
          if (match.dateFin == null ) {
            if (match.dateDebut<= (moment())) {
              this.matchesList.push(match)
            }
          }
        } );
      },
        error => {
          this.errorMessage = error.error;
          this.toasterService.displayToast(this.errorMessage, ColorPaletteTypes.warn, 3000);
        });
    });
  }

  endMatch(match) {
    this.matchDataService.endMatch(match).subscribe((match: Match) => {
        this.matchesList.splice( this.matchesList.indexOf(match), 1 );
      }
    );
  }

}
