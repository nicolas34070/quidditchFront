import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { environment } from '../../environments/environment';
import {Joueur} from '../models/Joueur';
import {AuthService} from '../core/services/auth.service';

const urlJoueurs = 'joueurs';

@Injectable()
export class JoueurDataService {


  // --------------------------------------------------
  //                     CONSTRUCTOR
  // --------------------------------------------------


  constructor(private http: HttpClient, private authService: AuthService) {
  }


  // --------------------------------------------------
  //                     METHODS
  // --------------------------------------------------


  /**
   * Return all joueurs from DB
   * @returns {Observable<Joueur[]>}
   */
  getJoueurs(): Observable<Joueur[]> {
    return this.http.get(environment.urls.baseApiUrl + urlJoueurs).pipe(
      map(
        (data: any[]) => {
          const joueurs = [];
          data.forEach((joueur) => {
            joueurs.push(Joueur.mapToJoueur(joueur));
          });
          return joueurs;
        }
      )
    );
  }



  /**
   * Return a joueurs from DB with its id
   * @param {String} id - The joueur's id
   * @returns {Observable<Joueur>}
   */
  getJoueur(id: string): Observable<Joueur> {
    // @ts-ignore
    return this.http.get(environment.urls.baseApiUrl + urlJoueurs + '/' + id).pipe(
      map(
        (data: any) => {
          return Joueur.mapToJoueur(data);
        }
      )
    );
  }


  /**
   * Add a joueur into DB
   * @param {Joueur} joueur - The joueur to add
   * @returns {Observable<Joueur>}
   */
  addJoueur(joueur: Joueur): Observable<Joueur> {
      const body = {
        nom: joueur.nom || '',
        nationalite: joueur.nationalite.idPays,
        poste: joueur.poste.idPoste,
        equipe: joueur.equipe.idEquipe
      };
      return this.http.post(environment.urls.secureApi + urlJoueurs, body,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUserToken()),
        }).pipe(
        map(
          (data: any) => {
            return Joueur.mapToJoueur(data);
          }
        )
      );
  }



  /**
   * Update a joueur in DB
   * @param {Joueur} joueur - The joueur to update
   * @returns {Observable<Joueur>}
   */
  updateJoueur(joueur: Joueur): Observable<Joueur> {
    try {
      const body = {
        nom: joueur.nom,
        nationalite: joueur.nationalite.idPays,
        poste: joueur.poste.idPoste,
        equipe: joueur.equipe.idEquipe
      };

      return this.http.put(environment.urls.secureApi + urlJoueurs + '/' + joueur.idJoueur, body,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUserToken()),
        }).pipe(
        map(
          (data: any) => {
            return Joueur.mapToJoueur(data);
          }
        )
      );
    } catch (err) {
      console.log('%c Error updating joueur ', 'font-weight: bold; color: red', err);
    }
  }


  /**
   * Delete a joueur in DB
   * @param {Joueur} joueur - The joueur to update
   * @returns {Observable<Joueur>}
   */
  deleteJoueur(joueur: Joueur): Observable<Joueur> {
    try {
      return this.http.delete(environment.urls.secureApi + urlJoueurs + '/' + joueur.idJoueur,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUserToken()),
        }).pipe(
        map(
          (data: any) => {
            return Joueur.mapToJoueur(data);
          }
        )
      );
    } catch (err) {
      console.log('%c Error updating joueur ', 'font-weight: bold; color: red', err);
    }
  }
}
