import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { environment } from '../../environments/environment';
import {Niveau} from '../models/Niveau';

const urlNiveaus = 'niveaux';

@Injectable()
export class NiveauDataService {


  // --------------------------------------------------
  //                     CONSTRUCTOR
  // --------------------------------------------------


  constructor(private http: HttpClient) {
  }


  // --------------------------------------------------
  //                     METHODS
  // --------------------------------------------------


  /**
   * Return all Niveaus from DB
   * @returns {Observable<Niveau[]>}
   */
  getNiveaux(): Observable<Niveau[]> {
    return this.http.get(environment.urls.baseApiUrl + urlNiveaus).pipe(
      map(
        (data: any[]) => {
          const Niveaux = [];
          data.forEach((niveau) => {
            Niveaux.push(Niveau.mapToNiveau(niveau));
          });
          return Niveaux;
        }
      )
    );
  }

}
