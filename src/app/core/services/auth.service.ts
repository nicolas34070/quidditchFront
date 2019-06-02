import {EventEmitter, Injectable, Output} from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {User} from "../../models/User";
import {map} from "rxjs/operators";
import {send} from "q";


@Injectable()
export class AuthService {

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();



  // --------------------------------------------------
  //                     PROPERTIES
  // --------------------------------------------------


  isLoggedIn: boolean = false;



  // --------------------------------------------------
  //                     CONSTRUCTOR
  // --------------------------------------------------


  constructor(
    public router: Router,
    private http: HttpClient
  ) { }



  // --------------------------------------------------
  //                     METHODS
  // --------------------------------------------------


  /**
   * Returns if the user is authentificated and check if it is Administrator.
   * Otherwise, the user is redirect to the login page
   * @returns {boolean}
   */
  public isAuthenticated(): void {
    if (this.getUserToken()) {
      this.isLoggedIn = true;
    } else {
      this.router.navigate(['/login']);
    }
  }




  /**
   * Login a user
   * @param {User} user - The user to login
   * @returns {Observable<User>}
   */
  getUsername(data: { username: string, password: string }, token): Observable<User> {
    try {
      const body = {
        username:  data.username,
      };

      var sendToken = 'Bearer ' + token;
      console.log(sendToken);

      return this.http.post(environment.urls.baseApiUrl + "secure/login", body,
        {
          headers: new HttpHeaders().set('Authorization', sendToken),
        }
      ).pipe(
        map(
          (data: any) => {
            var user = User.mapToUser(data);
            localStorage.setItem('user', JSON.stringify(user));
            this.isLoggedIn = true;
            this.getLoggedInName.emit(user);

            return  user;

          }
        )
      );
    } catch (err) {
      console.log('%c Error adding user ', 'font-weight: bold; color: red', err);
    }
  }

  /**
   * Function to log in an user.
   * Otherwise, returns an authentication error.
   * @param {Object} data - The user's data.
   * @param {string} data.email - The email.
   * @param {string} data.password - The user's password.
   * @returns {Observable}
   */
  login(data: { username: string, password: string }): Observable<any> {
    try {
      const body = {
        username:  data.username,
      };

      const bodyToken = {
        username:  data.username,
        password: data.password,
        grant_type: "password",
        client_id : environment.client_id ,
        client_secret: environment.client_secret,
      };
        return this.http.post(environment.urls.rootApi + "oauth/v2/token ", bodyToken).pipe(
               map(
                 (data: any) => {

                   var token = JSON.stringify(data);
                   localStorage.setItem('token', data["access_token"]);
                   return data;
                 }
               )
             );
    } catch (err) {
      console.log('%c Error adding user ', 'font-weight: bold; color: red', err);
    }
  }





  /**
   * Function to log out actual user.
   * Clear user token and redirect to login page.
   */
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.getLoggedInName.emit(null);
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }



  /**
   * Return user's token.
   */
  getUser(): string {
    return localStorage.getItem('user');
  }

  /**
   * Return user's token.
   */
  getUserToken(): string {
    return localStorage.getItem('token');
  }
}
