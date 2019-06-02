import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { environment } from '../../environments/environment';
import {User} from "../models/User";
import {Role} from "../enums/Role";
import {AuthService} from "../core/services/auth.service";

const urlUsers = 'utilisateurs';

@Injectable()
export class UserDataService {


  // --------------------------------------------------
  //                     CONSTRUCTOR
  // --------------------------------------------------




  constructor(private http: HttpClient, private authService : AuthService) {
  }


  // --------------------------------------------------
  //                     METHODS
  // --------------------------------------------------


  /**
   * Return all users from DB
   * @returns {Observable<User[]>}
   */
  getUsers(): Observable<User[]> {
    return this.http.get(environment.urls.secureApi + urlUsers, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUserToken()),
    }).pipe(
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
    return this.http.get(environment.urls.secureApi + urlUsers + '/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUserToken()),
    }).pipe(
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
        nom: user.username || '',
        roles:  Role.arbitre,
        motDepasse: randomstring,
        email: user.email
      };
      return this.http.post(environment.urls.baseApiUrl + urlUsers, body, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUserToken()),
      }).pipe(
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
        nom: user.username,
        roles:  Role.arbitre,
        email: user.email
      };

      return this.http.put(environment.urls.secureApi + urlUsers + '/' + user.idUtilisateur, body, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUserToken()),
      }).pipe(
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
      return this.http.delete(environment.urls.secureApi + urlUsers + '/' + user.idUtilisateur,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUserToken()),
        }).pipe(
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
