import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { environment } from '../../environments/environment';
import {Match} from "../models/Match";
import * as moment from 'moment';

const urlMatchs = 'matchs';

@Injectable()
export class MatchDataService {


  // --------------------------------------------------
  //                     CONSTRUCTOR
  // --------------------------------------------------


  constructor(private http: HttpClient) {
  }


  // --------------------------------------------------
  //                     METHODS
  // --------------------------------------------------


  /**
   * Return all matchs from DB
   * @returns {Observable<Match[]>}
   */
  getMatchs(): Observable<Match[]> {
    return this.http.get(environment.urls.baseApiUrl + urlMatchs).pipe(
      map(
        (data: any[]) => {
          const matchs = [];
          data.forEach((match) => {
            matchs.push(Match.mapToMatch(match));
          });
          return matchs;
        }
      )
    );
  }



  /**
   * Return a matchs from DB with its id
   * @param {String} id - The match's id
   * @returns {Observable<Match>}
   */
  getMatch(id: string): Observable<Match> {
    // @ts-ignore
    return this.http.get(environment.urls.baseApiUrl + urlMatchs + '/' + id).pipe(
      map(
        (data: any) => {
          return Match.mapToMatch(data);
        }
      )
    );
  }

  /**
   * Return matchs from DB with
   * @param {String} id - The match's id
   * @returns {Observable<Match>}
   */
  getMatchsByArbitre(idArbitre: string): Observable<Match[]>{
    // @ts-ignore
    return this.http.get(environment.urls.baseApiUrl + urlMatchs + '/arbitre/' + idArbitre).pipe(
      map(
        (data: any[]) => {
          const matchs = [];
          data.forEach((match) => {
            matchs.push(Match.mapToMatch(match));
          });
          return matchs;
        }
      )
    );
  }



  /**
   * Add a match into DB
   * @param {Match} match - The match to add
   * @returns {Observable<Match>}
   */
  addMatch(match: Match): Observable<Match> {
    try {
      const body = {
        idMatch: match.idMatch,
        scorePremiereEquipe: match.scorePremiereEquipe,
        scoreDeuxiemeEquipe: match.scoreDeuxiemeEquipe,
        temps: match.temps,
        date:  moment(match.date).format('DD MMMM HH:mm'),
        arbitre: match.arbitre,
        terrain: match.terrain,
        premiereEquipe: match.premiereEquipe,
        deuxiemeEquipe: match.deuxiemeEquipe
      };
      return this.http.post(environment.urls.baseApiUrl + urlMatchs, body).pipe(
        map(
          (data: any) => {
            return Match.mapToMatch(data);
          }
        )
      );
    } catch (err) {
      console.log('%c Error adding match ', 'font-weight: bold; color: red', err);
    }
  }

  /**
   * Update a match in DB
   * @param {Match} match - The match to update
   * @returns {Observable<Match>}
   */
  updateMatch(match: Match): Observable<Match> {
    try {
      const body = {
        idMatch: match.idMatch,
        scorePremiereEquipe: match.scorePremiereEquipe,
        scoreDeuxiemeEquipe: match.scoreDeuxiemeEquipe,
        temps: match.temps,
        date: moment(match.date).format('DD MMMM HH:mm') ,
        arbitre: match.arbitre,
        terrain: match.terrain,
        premiereEquipe: match.premiereEquipe,
        deuxiemeEquipe: match.deuxiemeEquipe
      };

      return this.http.put(environment.urls.baseApiUrl + urlMatchs + '/' + match.idMatch, body).pipe(
        map(
          (data: any) => {
            return Match.mapToMatch(data);
          }
        )
      );
    } catch (err) {
      console.log('%c Error updating match ', 'font-weight: bold; color: red', err);
    }
  }

  /**
   * Update a match score in DB
   * @param {Match} match - The match to update
   * @returns {Observable<Match>}
   */
  updateMatchScore(match: Match): Observable<Match> {
    try {
      const body = {
        scorePremiereEquipe: match.scorePremiereEquipe,
        scoreDeuxiemeEquipe: match.scoreDeuxiemeEquipe,
      };

      return this.http.put(environment.urls.baseApiUrl + urlMatchs + '/score/' + match.idMatch, body).pipe(
        map(
          (data: any) => {
            return Match.mapToMatch(data);
          }
        )
      );
    } catch (err) {
      console.log('%c Error updating match ', 'font-weight: bold; color: red', err);
    }
  }
}
