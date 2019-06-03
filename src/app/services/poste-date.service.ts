import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { environment } from '../../environments/environment';
import {Poste} from '../models/Poste';

const urlPostes = 'postes';

@Injectable()
export class PosteDataService {


  // --------------------------------------------------
  //                     CONSTRUCTOR
  // --------------------------------------------------


  constructor(private http: HttpClient) {
  }


  // --------------------------------------------------
  //                     METHODS
  // --------------------------------------------------


  /**
   * Return all postes from DB
   * @returns {Observable<Poste[]>}
   */
  getPostes(): Observable<Poste[]> {
    return this.http.get(environment.urls.baseApiUrl + urlPostes).pipe(
      map(
        (data: any[]) => {
          const postes = [];
          data.forEach((poste) => {
            postes.push(Poste.mapToPoste(poste));
          });
          return postes;
        }
      )
    );
  }



  /**
   * Return a postes from DB with its id
   * @param {String} id - The poste's id
   * @returns {Observable<Poste>}
   */
  getPoste(id: string): Observable<Poste> {
    // @ts-ignore
    return this.http.get(environment.urls.baseApiUrl + urlPostes + '/' + id).pipe(
      map(
        (data: any) => {
          return Poste.mapToPoste(data);
        }
      )
    );
  }


  /**
   * Add a poste into DB
   * @param {Poste} poste - The poste to add
   * @returns {Observable<Poste>}
   */
  addPoste(poste: Poste): Observable<Poste> {
    try {
      const body = {
        nom: poste.nom || '',
      };
      return this.http.post(environment.urls.baseApiUrl + urlPostes, body).pipe(
        map(
          (data: any) => {
            return Poste.mapToPoste(data);
          }
        )
      );
    } catch (err) {
      console.log('%c Error adding poste ', 'font-weight: bold; color: red', err);
    }
  }



  /**
   * Update a poste in DB
   * @param {Poste} poste - The poste to update
   * @returns {Observable<Poste>}
   */
  updatePoste(poste: Poste): Observable<Poste> {
    try {
      const body = {
        nom: poste.nom,
      };

      return this.http.put(environment.urls.baseApiUrl + urlPostes + '/' + poste.idPoste, body).pipe(
        map(
          (data: any) => {
            return Poste.mapToPoste(data);
          }
        )
      );
    } catch (err) {
      console.log('%c Error updating poste ', 'font-weight: bold; color: red', err);
    }
  }


  /**
   * Delete a poste in DB
   * @param {Poste} poste - The poste to update
   * @returns {Observable<Poste>}
   */
  deletePoste(poste: Poste): Observable<Poste> {
    try {
      return this.http.delete(environment.urls.baseApiUrl + urlPostes + '/' + poste.idPoste).pipe(
        map(
          (data: any) => {
            return Poste.mapToPoste(data);
          }
        )
      );
    } catch (err) {
      console.log('%c Error updating poste ', 'font-weight: bold; color: red', err);
    }
  }
}
