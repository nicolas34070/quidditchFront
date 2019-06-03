import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { environment } from '../../environments/environment';
import {Match} from '../models/Match';
import * as moment from 'moment';
import {PusherService} from './pusher.service';
import {AuthService} from '../core/services/auth.service';

const urlMatchs = 'matchs';

@Injectable()
export class MatchDataService {

  private _channel: any;


  // --------------------------------------------------
  //                     CONSTRUCTOR
  // --------------------------------------------------


  constructor(private http: HttpClient, private pusherService: PusherService, private authService: AuthService) {
    this._channel = this.pusherService.getPusher().subscribe('matchs');
  }


  // --------------------------------------------------
  //                     METHODS
  // --------------------------------------------------


  /**
   * @return employee's channel for the different event available under employee
   */
  getChannel() {
    return this._channel;
  }

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
   * Return all matchs from DB
   * @returns {Observable<Match[]>}
   */
  getMatchsAdmin(): Observable<Match[]> {
    const userId = JSON.parse(this.authService.getUser()).idUtilisateur;
    return this.http.get(environment.urls.secureApi + 'createdby/' +  urlMatchs  +  '/' + userId,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUserToken()),
      }).pipe(
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
  getMatchsByArbitre(idArbitre: string): Observable<Match[]> {
    // @ts-ignore
    return this.http.get(environment.urls.secureApi + urlMatchs + '/arbitre/' + idArbitre,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUserToken()),
      }).pipe(
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
  getMatchsByTournoi(idTournoi: string): Observable<Match[]> {
    // @ts-ignore
    return this.http.get(environment.urls.baseApiUrl + urlMatchs + '/tournoi/' + idTournoi).pipe(
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
    const userId = JSON.parse(this.authService.getUser()).idUtilisateur;

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
        tournoi: match.tournoi.idTournoi,
        user: userId
      };
      return this.http.post(environment.urls.secureApi + urlMatchs, body,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUserToken()),
        }).pipe(
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

      return this.http.put(environment.urls.secureApi + urlMatchs + '/' + match.idMatch, body,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUserToken()),
        }).pipe(
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

      return this.http.put(environment.urls.secureApi + urlMatchs + '/score/' + match.idMatch, body,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUserToken()),
        }).pipe(
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
  endMatch(match: Match): Observable<Match> {
    try {
      const body = {

      };

      return this.http.put(environment.urls.secureApi + urlMatchs + '/end/' + match.idMatch, body,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUserToken()),
        }).pipe(
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
      return this.http.delete(environment.urls.secureApi + urlMatchs + '/score/' + match.idMatch,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUserToken()),
        }).pipe(
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
