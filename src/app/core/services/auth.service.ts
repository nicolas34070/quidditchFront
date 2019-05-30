import {EventEmitter, Injectable, Output} from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {User} from "../../models/User";
import {map} from "rxjs/operators";


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
  login(data: { username: string, password: string }): Observable<User> {
    try {
      const body = {
        username:  data.username,
        password: data.password,
      };
      return this.http.post(environment.urls.baseApiUrl + "login", body).pipe(
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



  // /**
  //  * Function to log in an user.
  //  * Otherwise, returns an authentication error.
  //  * @param {Object} data - The user's data.
  //  * @param {string} data.email - The email.
  //  * @param {string} data.password - The user's password.
  //  * @returns {Observable}
  //  */
  // login(data: { email: string, password: string }): Observable<any> {
  //   return new Observable(
  //     obserser => {
  //       this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password).then(
  //         (response: any) => {
  //           firebase.auth().currentUser.getIdToken().then(token => {
  //             this.http.get(`${environment.urls.baseApiUrl}auth/login`,
  //               { headers: { Authorization: `Bearer ${token}` } }).toPromise().then(
  //               () => {
  //                 localStorage.setItem('token', token);
  //                 this.isLoggedIn = true;
  //                 obserser.next(response);
  //               },
  //               error => obserser.error(this.translate.instant('CONNECTION.ERROR.NEST_API') + ' ' + error.message)
  //             );
  //           });
  //         })
  //         .catch(error => {
  //           if (error.code === 'auth/user-not-found') {
  //             obserser.error(this.translate.instant('CONNECTION.ERROR.USER_NOT_FOUND'));
  //           } else if (error.code === 'auth/wrong-password') {
  //             obserser.error(this.translate.instant('CONNECTION.ERROR.WRONG_PASSWORD'));
  //           } else {
  //             obserser.error(this.translate.instant('CONNECTION.ERROR.CONNECTION_FAILED'));
  //           }
  //         });
  //     });
  // }



  /**
   * Function to log out actual user.
   * Clear user token and redirect to login page.
   */
  logout() {
    //this.afAuth.auth.signOut().then(() => {
    localStorage.removeItem('user');
    this.getLoggedInName.emit(null);
    this.isLoggedIn = false;
    this.router.navigate(['/login']);

    // }).catch(error => {
    //   console.error(error);
    // });
  }



  /**
   * Return user's token.
   */
  getUserToken(): string {
    return localStorage.getItem('user');
  }
}
