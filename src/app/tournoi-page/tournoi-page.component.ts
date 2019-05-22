import { Component, OnInit } from '@angular/core';
import {Match} from "../models/Match";
import {MatchDataService} from "../services/match-data.service";
import {TournoiDataService} from "../services/tournoi-date.service";
import {Tournoi} from "../models/Tournoi";

@Component({
  selector: 'app-tournoi-page',
  templateUrl: './tournoi-page.component.html',
  styleUrls: ['./tournoi-page.component.css']
})
export class TournoiPageComponent implements OnInit {


  public tournoisListEnCours: Tournoi[] = [];
  public tournoisListFinis: Tournoi[] = [];

  constructor(public tournoiDataService: TournoiDataService) { }

  async ngOnInit() {
    this.tournoiDataService.getTournois().subscribe((tournois: Tournoi[]) =>
    {
      tournois.map(tournoi => {
        console.log(tournoi);
        if (tournoi.dateFin == null) {
          this.tournoisListEnCours.push(tournoi);
        } else {
          console.log(tournoi)
          this.tournoisListFinis.push(tournoi);
        }
      } );
    });
  }
}
