import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { environment } from '../../environments/environment';
import {Tournoi} from "../models/Tournoi";

const urlTournois = 'tournois';

@Injectable()
export class TournoiDataService {


  // --------------------------------------------------
  //                     CONSTRUCTOR
  // --------------------------------------------------


  constructor(private http: HttpClient) {
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
   * Return a tournois from DB with its id
   * @param {String} id - The tournoi's id
   * @returns {Observable<Tournoi>}
   */
  getTournoi(id: string): Observable<Tournoi> {
    // @ts-ignore
    return this.http.get(environment.urls.baseApiUrl + urlTournois + '/' + id).pipe(
      map(
        (data: any) => {
          return Tournoi.mapToTournoi(data);
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
    let dateDebut = tournoi.dateDebut != null ? tournoi.dateDebut.format() : " ";
    try {
      const body = {
        nom: tournoi.nom,
        pays: tournoi.pays.idPays,
        dateDebut: dateDebut
      };

      return this.http.post(environment.urls.baseApiUrl + urlTournois, body).pipe(
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
    let dateDebut = tournoi.dateDebut != null ? tournoi.dateDebut.format() : " ";
    let dateFin = tournoi.dateFin != null ? tournoi.dateFin.format() : "none";
    try {
      const body = {
        nom: tournoi.nom,
        pays: tournoi.pays.idPays,
        dateDebut: dateDebut,
        dateFin:  dateFin,
      };

      console.log(body);

      return this.http.put(environment.urls.baseApiUrl + urlTournois + '/' + tournoi.idTournoi, body).pipe(
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
      return this.http.delete(environment.urls.baseApiUrl + urlTournois + '/' + tournoi.idTournoi).pipe(
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


