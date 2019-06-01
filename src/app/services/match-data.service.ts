import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map, publish, publishLast, refCount, share} from 'rxjs/internal/operators';
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
    return this.http.get(environment.urls.baseApiUrl + urlMatchs)
      .pipe(
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
  };



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
   * Return matchs from DB with
   * @param {String} id - The match's id
   * @returns {Observable<Match>}
   */
  getMatchsByTournoi(idTournoi: string): Observable<Match[]>{
    // @ts-ignore
    return this.http.get(environment.urls.baseApiUrl + urlMatchs + '/tournoi/' + idTournoi).pipe(
      publishLast(),
      refCount(),
      share(),
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
        dateDebut: match.dateDebut == null ? ' ' :  match.dateDebut.format(),
        arbitre: match.arbitre.idUtilisateur,
        terrain: match.terrain.idTerrain,
        premiereEquipe: match.premiereEquipe.idEquipe,
        deuxiemeEquipe: match.deuxiemeEquipe.idEquipe,
        tournoi: match.tournoi.idTournoi
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
        dateDebut: match.dateDebut == null ? ' ' : match.dateDebut.format(),
        dateFin:  match.dateFin == null ? 'none' : match.dateFin.format() ,
        arbitre: match.arbitre.idUtilisateur,
        terrain: match.terrain.idTerrain,
        premiereEquipe: match.premiereEquipe.idEquipe,
        deuxiemeEquipe: match.deuxiemeEquipe.idEquipe,
        tournoi: match.tournoi.idTournoi
      };

      return this.http.put(environment.urls.baseApiUrl + urlMatchs + match.idMatch, body).pipe(
        map(
          (data: any) => {
            return Match.mapToMatch(data);
          }
        )
      )
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

      return  this.http.put(environment.urls.baseApiUrl + urlMatchs + '/score/' + match.idMatch, body).pipe(
        publishLast(),
        refCount(),
        share()
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
  endMatch(match: Match): Observable<Match> {
    try {
      const body = {

      };

      return this.http.put(environment.urls.baseApiUrl + urlMatchs + '/end/' + match.idMatch, body).pipe(
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
   * Delete a match score in DB
   * @param {Match} match - The match to update
   * @returns {Observable<Match>}
   */
  deleteMatch(match: Match): Observable<Match> {
    try {
      return this.http.delete(environment.urls.baseApiUrl + urlMatchs + '/score/' + match.idMatch).pipe(
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
