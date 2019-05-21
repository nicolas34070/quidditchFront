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
    try {
      const body = {
        nom: user.nom || '',
        type: user.role || 'type 1'
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
        client: user.nom,
        type: user.role,
      };

      return this.http.patch(environment.urls.baseApiUrl + urlUsers + '/' + user.id, body).pipe(
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
