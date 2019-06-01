import {BehaviorSubject, Observable} from "rxjs";
import {Match} from "../models/Match";
import {MatchDataService} from "./match-data.service";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class MatchStore {

  private _matchs: BehaviorSubject<Match[]>;

  constructor(private matchBackendService: MatchDataService) {
    this._matchs = new BehaviorSubject<Match[]>([]);
  }

  get matchs(): Observable<Match[]> {
    console.log(this._matchs);
    return this._matchs.asObservable();
  }

  public setObservable(newValue): void {
    this._matchs.next(newValue);
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


  toggleMatch(toggled:Match): Observable<Match>  {
    let obs: Observable<Match>  = this.matchBackendService.updateMatchScore(toggled);

    obs.subscribe(
      res => {
        let toggle = Match.mapToMatch(res);
        let matchs = this._matchs.getValue();
        let index = matchs.indexOf(toggled );
         matchs[index] = toggle;
         console.log(matchs);
         this.setObservable(matchs);
      }
    );

    return obs;
  }


}
