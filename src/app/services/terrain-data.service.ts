import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { environment } from '../../environments/environment';
import {Terrain} from '../models/Terrain';
import {AuthService} from '../core/services/auth.service';

const urlTerrains = 'terrains';

@Injectable()
export class TerrainDataService {


  // --------------------------------------------------
  //                     CONSTRUCTOR
  // --------------------------------------------------


  constructor(private http: HttpClient, private authService: AuthService) {
  }


  // --------------------------------------------------
  //                     METHODS
  // --------------------------------------------------


  /**
   * Return all Terrains from DB
   * @returns {Observable<Terrain[]>}
   */
  getTerrains(): Observable<Terrain[]> {
    return this.http.get(environment.urls.baseApiUrl + urlTerrains).pipe(
      map(
        (data: any[]) => {
          const terrains = [];
          data.forEach((terrain) => {
            terrains.push(Terrain.mapToTerrain(terrain));
          });
          return terrains;
        }
      )
    );
  }


  /**
   * Return a Terrains from DB with its id
   * @param {String} id - The Terrain's id
   * @returns {Observable<Terrain>}
   */
  getTerrain(id: string): Observable<Terrain> {
    // @ts-ignore
    return this.http.get(environment.urls.baseApiUrl + urlTerrains + '/' + id).pipe(
      map(
        (data: any) => {
          return Terrain.mapToTerrain(data);
        }
      )
    );
  }


  /**
   * Add a Terrain into DB
   * @param {terrain} Terrain - The Terrain to add
   * @returns {Observable<Terrain>}
   */
  addTerrain(terrain: Terrain): Observable<Terrain> {
    try {
      const body = {
        nom: terrain.nom || '',
        lieu: terrain.lieu.idPays || '1'
      };
      return this.http.post(environment.urls.secureApi + urlTerrains, body,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUserToken()),
        }).pipe(
        map(
          (data: any) => {
            return Terrain.mapToTerrain(data);
          }
        )
      );
    } catch (err) {
      console.log('%c Error adding Terrain ', 'font-weight: bold; color: red', err);
    }
  }



  /**
   * Update a Terrain in DB
   * @param {Terrain} Terrain - The Terrain to update
   * @returns {Observable<Terrain>}
   */
  updateTerrain(terrain: Terrain): Observable<Terrain> {
    try {
      const body = {
        nom: terrain.nom,
        lieu: terrain.lieu.idPays,
      };

      return this.http.put(environment.urls.secureApi + urlTerrains + '/' + terrain.idTerrain, body,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUserToken()),
        }).pipe(
        map(
          (data: any) => {
            return Terrain.mapToTerrain(data);
          }
        )
      );
    } catch (err) {
      console.log('%c Error updating Terrain ', 'font-weight: bold; color: red', err);
    }
  }


  /**
   * Delete a Terrain in DB
   * @param {Terrain} Terrain - The Terrain to update
   * @returns {Observable<Terrain>}
   */
  deleteTerrain(terrain: Terrain): Observable<Terrain> {
    try {
      return this.http.delete(environment.urls.secureApi + urlTerrains + '/' + terrain.idTerrain,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUserToken()),
        }).pipe(
        map(
          (data: any) => {
            return Terrain.mapToTerrain(data);
          }
        )
      );
    } catch (err) {
      console.log('%c Error updating Terrain ', 'font-weight: bold; color: red', err);
    }
  }
}
