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
    this.onChangeData();
  }

  private subscribeToData(): void {
    this.interval = setInterval(() => {
      this.onChangeDataSubscription();
    }, 5000);
  }

   private arraysEqual(arr1 : Match[], arr2 : Match[])  : boolean{
    if(arr1.length !== arr2.length)
      return false;
    for(var i = arr1.length; i--;) {
      if(arr1[i].idMatch !== arr2[i].idMatch)
        return false;
    }

    return true;
  }

  onChangeDataSubscription() {
    this.route.params.subscribe(params => {
      this.id = params['id']

      var MatchsListEnCoursBis = [];
      var MatchsListFinisBis = [];
      var MatchsListAVenirBis = [];

      this.matchDataService.getMatchsByTournoi(this.id).subscribe((matches: Match[]) => {
        matches.map(match => {
          if (match.dateFin == null ) {
            if (match.dateDebut.format("DD/MM/YYY") > (moment().format("DD/MM/YYY"))) {
              MatchsListAVenirBis.push(match)
            } else {
              MatchsListEnCoursBis.push(match);

            }
          } else {
            MatchsListFinisBis.push(match);
          }
        }
        );

        if(this.arraysEqual(this.MatchsListEnCours, MatchsListEnCoursBis) == false) {
          console.log("one");
          this.MatchsListEnCours = MatchsListEnCoursBis;
        }

        if(this.arraysEqual(this.MatchsListAVenir, MatchsListAVenirBis) == false) {
          this.MatchsListAVenir = MatchsListAVenirBis;
        }

        if(this.arraysEqual(this.MatchsListFinis, MatchsListFinisBis) == false){
          this.MatchsListFinis = MatchsListFinisBis;
        }
      });
    });
  }

  onChangeData() {
    this.route.params.subscribe(params => {
      this.id = params['id']

      this.matchDataService.getMatchsByTournoi(this.id).subscribe((matches: Match[]) => {
        matches.map(match => {
            if (match.dateFin == null ) {
              if (match.dateDebut.format("DD/MM/YYY") > (moment().format("DD/MM/YYY"))) {
                this.MatchsListAVenir .push(match)
              } else {
                this.MatchsListEnCours .push(match);

              }
            } else {
              this.MatchsListFinis.push(match);
            }
          }
        );
      });

      this.subscribeToData();

    });
  }

}
