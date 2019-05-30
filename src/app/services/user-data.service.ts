import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { environment } from '../../environments/environment';
import {User} from "../models/User";

const urlUsers = 'utilisateurs';

@Injectable()
export class UserDataService {


  // --------------------------------------------------
  //                     CONSTRUCTOR
  // --------------------------------------------------


  constructor(private http: HttpClient) {
  }


  // --------------------------------------------------
  //                     METHODS
  // --------------------------------------------------


  /**
   * Return all users from DB
   * @returns {Observable<User[]>}
   */
  getUsers(): Observable<User[]> {
    return this.http.get(environment.urls.baseApiUrl + urlUsers).pipe(
      map(
        (data: any[]) => {
          const users = [];
          data.forEach((user) => {
            users.push(User.mapToUser(user));
          });
          return users;
        }
      )
    );
  }

  /**
   * Return all users from DB
   * @returns {Observable<User[]>}
   */
  getArbitres(): Observable<User[]> {
    return this.http.get(environment.urls.baseApiUrl + "arbitres").pipe(
      map(
        (data: any[]) => {
          const users = [];
          data.forEach((user) => {
            users.push(User.mapToUser(user));
          });
          return users;
        }
      )
    );
  }



  /**
   * Return a users from DB with its id
   * @param {String} id - The user's id
   * @returns {Observable<User>}
   */
  getUser(id: string): Observable<User> {
    // @ts-ignore
    return this.http.get(environment.urls.baseApiUrl + urlUsers + '/' + id).pipe(
      map(
        (data: any) => {
          return User.mapToUser(data);
        }
      )
    );
  }


  /**
   * Add a user into DB
   * @param {User} user - The user to add
   * @returns {Observable<User>}
   */
  addUser(user: User): Observable<User> {
    var randomstring = Math.random().toString(20).slice(-8);
    try {
      const body = {
        nom: user.nom || '',
        roles:  1,
        motDepasse: randomstring,
        email: user.email
      };
      return this.http.post(environment.urls.baseApiUrl + urlUsers, body).pipe(
        map(
          (data: any) => {
            return User.mapToUser(data);
          }
        )
      );
    } catch (err) {
      console.log('%c Error adding user ', 'font-weight: bold; color: red', err);
    }
  }


  /**
   * Update a user in DB
   * @param {User} user - The user to update
   * @returns {Observable<User>}
   */
  updateUser(user: User): Observable<User> {
    try {
      const body = {
        nom: user.nom,
        roles: 1,
        email: user.email
      };

      return this.http.put(environment.urls.baseApiUrl + urlUsers + '/' + user.idUtilisateur, body).pipe(
        map(
          (data: any) => {
            return User.mapToUser(data);
          }
        )
      );
    } catch (err) {
      console.log('%c Error updating user ', 'font-weight: bold; color: red', err);
    }
  }

  /**
   * delete a user in DB
   * @param {User} user - The user to delete
   * @returns {Observable<User>}
   */
  deleteUser(user: User): Observable<User> {
    try {
      return this.http.delete(environment.urls.baseApiUrl + urlUsers + '/' + user.idUtilisateur).pipe(
        map(
          (data: any) => {
            return User.mapToUser(data);
          }
        )
      );
    } catch (err) {
      console.log('%c Error updating user ', 'font-weight: bold; color: red', err);
    }
  }
}
