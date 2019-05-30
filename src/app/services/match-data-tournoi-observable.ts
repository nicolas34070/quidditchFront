import {BehaviorSubject, Observable} from "rxjs";
import {Match} from "../models/Match";
import {MatchDataService} from "./match-data.service";
import {Injectable} from "@angular/core";


@Injectable()
export class MatchStore {

  private _matchs: BehaviorSubject<Match[]> = new BehaviorSubject([]);

  constructor(private matchBackendService: MatchDataService) {
  }

  get matchs() {
    return this._matchs.asObservable();
  }

  loadInitialData(id) {
    this.matchBackendService.getMatchsByTournoi(id)
      .subscribe(
        res => {
          this._matchs.next(res);
        },
        err => console.log("Error retrieving Matchs")
      );

  }

  addMatch(newMatch: Match): Observable {

    let obs = this.matchBackendService.addMatch(newMatch);

    obs.subscribe(
      res => {
        let matchs = this._matchs.getValue();
        matchs.push(newMatch);
        this._matchs.next(matchs);
      });

    return obs;
  }

  toggleMatch(toggled:Match): Observable {
    let obs: Observable = this.matchBackendService.updateMatchScore(toggled);

    obs.subscribe(
      res => {
        let matchs = this._matchs.getValue();
        let index = matchs.findIndex((match: Match) => match.idMatch === toggled.idMatch);
         matchs[index] = res;
        this._matchs.next(matchs);
      }
    );

    return obs;
  }


  deleteMatch(deleted:Match): Observable {
    let obs: Observable = this.matchBackendService.deleteMatch(deleted);

    obs.subscribe(
      res => {
        let matchs: Match[] = this._matchs.getValue();
        let index = matchs.findIndex((match) => match.idMatch === deleted.idMatch);
        matchs.slice(index, res)
        this._matchs.next(matchs);

      }
    );

    return obs;
  }


}
