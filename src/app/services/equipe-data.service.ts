import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { environment } from '../../environments/environment';
import {Equipe} from "../models/Equipe";
import {AuthService} from "../core/services/auth.service";

const urlEquipes = 'equipes';

@Injectable()
export class EquipeDataService {


  // --------------------------------------------------
  //                     CONSTRUCTOR
  // --------------------------------------------------


  constructor(private http: HttpClient, private authService: AuthService) {
  }


  // --------------------------------------------------
  //                     METHODS
  // --------------------------------------------------


  /**
   * Return all equipes from DB
   * @returns {Observable<Equipe[]>}
   */
  getEquipes(): Observable<Equipe[]> {
    return this.http.get(environment.urls.baseApiUrl + urlEquipes).pipe(
      map(
        (data: any[]) => {
          const equipes = [];
          data.forEach((equipe) => {
            equipes.push(Equipe.mapToEquipe(equipe));
          });
          return equipes;
        }
      )
    );
  }



  /**
   * Return a equipes from DB with its id
   * @param {String} id - The equipe's id
   * @returns {Observable<Equipe>}
   */
  getEquipe(id: string): Observable<Equipe> {
    // @ts-ignore
    return this.http.get(environment.urls.baseApiUrl + urlEquipes + '/' + id).pipe(
      map(
        (data: any) => {
          return Equipe.mapToEquipe(data);
        }
      )
    );
  }


  /**
   * Add a equipe into DB
   * @param {Equipe} equipe - The equipe to add
   * @returns {Observable<Equipe>}
   */
  addEquipe(equipe: Equipe): Observable<Equipe> {
    try {
      const body = {
        nom: equipe.nom || '',
      };
      return this.http.post(environment.urls.secureApi + urlEquipes, body,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUserToken()),
        }).pipe(
        map(
          (data: any) => {
            return Equipe.mapToEquipe(data);
          }
        )
      );
    } catch (err) {
      console.log('%c Error adding equipe ', 'font-weight: bold; color: red', err);
    }
  }



  /**
   * Update a equipe in DB
   * @param {Equipe} equipe - The equipe to update
   * @returns {Observable<Equipe>}
   */
  updateEquipe(equipe: Equipe): Observable<Equipe> {
    try {
      const body = {
        nom: equipe.nom,
      };

      return this.http.put(environment.urls.secureApi + urlEquipes + '/' + equipe.idEquipe, body,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUserToken()),
        }).pipe(
        map(
          (data: any) => {
            return Equipe.mapToEquipe(data);
          }
        )
      );
    } catch (err) {
      console.log('%c Error updating equipe ', 'font-weight: bold; color: red', err);
    }
  }


  /**
   * Delete a equipe in DB
   * @param {Equipe} equipe - The equipe to update
   * @returns {Observable<Equipe>}
   */
  deleteEquipe(equipe: Equipe): Observable<Equipe> {
    try {
      return this.http.delete(environment.urls.secureApi + urlEquipes + '/' + equipe.idEquipe,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUserToken()),
        }).pipe(
        map(
          (data: any) => {
            return Equipe.mapToEquipe(data);
          }
        )
      );
    } catch (err) {
      console.log('%c Error updating equipe ', 'font-weight: bold; color: red', err);
    }
  }
}
