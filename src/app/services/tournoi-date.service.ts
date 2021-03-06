import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { environment } from '../../environments/environment';
import {Tournoi} from '../models/Tournoi';
import {AuthService} from '../core/services/auth.service';

const urlTournois = 'tournois';

@Injectable()
export class TournoiDataService {


  // --------------------------------------------------
  //                     CONSTRUCTOR
  // --------------------------------------------------


  constructor(private http: HttpClient, private authService: AuthService) {
  }


  // --------------------------------------------------
  //                     METHODS
  // --------------------------------------------------


  /**
   * Return all tournois from DB
   * @returns {Observable<Tournoi[]>}
   */
  getTournois(): Observable<Tournoi[]> {
    return this.http.get(environment.urls.baseApiUrl + urlTournois).pipe(
      map(
        (data: any[]) => {
          const tournois = [];
          data.forEach((tournoi) => {
            tournois.push(Tournoi.mapToTournoi(tournoi));
          });
          return tournois;
        }
      )
    );
  }



  /**
   * Return all tournois from DB
   * @returns {Observable<Tournoi[]>}
   */
  getTournoisAdmin(): Observable<Tournoi[]> {
    const userId = JSON.parse(this.authService.getUser()).idUtilisateur;
    return this.http.get(environment.urls.secureApi + 'createdby/' +  urlTournois  +  '/' + userId,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUserToken()),
      }).pipe(
      map(
        (data: any[]) => {
          const tournois = [];
          data.forEach((tournoi) => {
            tournois.push(Tournoi.mapToTournoi(tournoi));
          });
          return tournois;
        }
      )
    );
  }

  /**
   * Add a tournoi into DB
   * @param {Tournoi} tournoi - The tournoi to add
   * @returns {Observable<Tournoi>}
   */
  addTournoi(tournoi: Tournoi): Observable<Tournoi> {
    const userId = JSON.parse(this.authService.getUser()).idUtilisateur;

    const dateDebut = tournoi.dateDebut != null ? tournoi.dateDebut.format() : ' ';
    try {
      const body = {
        nom: tournoi.nom,
        pays: tournoi.pays.idPays,
        dateDebut,
        user: userId
      };

      return this.http.post(environment.urls.secureApi + urlTournois, body,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUserToken()),
        }).pipe(
        map(
          (data: any) => {
            return Tournoi.mapToTournoi(data);
          }
        )
      );
    } catch (err) {
      console.log('%c Error adding tournoi ', 'font-weight: bold; color: red', err);
    }
  }



  /**
   * Update a tournoi in DB
   * @param {Tournoi} tournoi - The tournoi to update
   * @returns {Observable<Tournoi>}
   */
  updateTournoi(tournoi: Tournoi): Observable<Tournoi> {
    const dateDebut = tournoi.dateDebut != null ? tournoi.dateDebut.format() : ' ';
    const dateFin = tournoi.dateFin != null ? tournoi.dateFin.format() : 'none';
    try {
      const body = {
        nom: tournoi.nom,
        pays: tournoi.pays.idPays,
        dateDebut,
        dateFin,
      };
      return this.http.put(environment.urls.secureApi + urlTournois + '/' + tournoi.idTournoi, body,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUserToken()),
        }).pipe(
        map(
          (data: any) => {
            return Tournoi.mapToTournoi(data);
          }
        )
      );
    } catch (err) {
      console.log('%c Error updating tournoi ', 'font-weight: bold; color: red', err);
    }
  }

  /**
   * Delete a tournoi in DB
   * @param {Tournoi} tournoi -
   * @returns {Observable<Tournoi>}
   */
  deleteTournoi(tournoi: Tournoi): Observable<Tournoi> {
    try {
      return this.http.delete(environment.urls.secureApi + urlTournois + '/' + tournoi.idTournoi,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUserToken()),
        }).pipe(
        map(
          (data: any) => {
            return Tournoi.mapToTournoi(data);
          }
        )
      );
    } catch (err) {
      console.log('%c Error updating tournoi ', 'font-weight: bold; color: red', err);
    }
  }

}


