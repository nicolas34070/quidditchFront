import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';


import {AuthService} from "./auth.service";


@Injectable()

export class AuthGuardService implements CanActivate {


  // --------------------------------------------------
  //                     CONSTRUCTOR
  // --------------------------------------------------


  constructor(
    public router: Router,
    private authService: AuthService
  ) { }



  // --------------------------------------------------
  //                     METHODS
  // --------------------------------------------------


  /**
   * Check if a route can be activated based on user's role.
   * @returns {boolean}
   */
  canActivate(): boolean {
    return this.authService.isLoggedIn;
    // TODO: The function returns true until we have an authentification and a role system.
  }
}
