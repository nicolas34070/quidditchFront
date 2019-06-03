import {Component, OnInit} from '@angular/core';
import {AuthService} from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {


  // --------------------------------------------------
  //                     PROPERTIES
  // --------------------------------------------------


  title = 'quidditchFront';



  // --------------------------------------------------
  //                     CONSTRUCTOR
  // --------------------------------------------------


  constructor(
    public authService: AuthService
  ) { }



  // --------------------------------------------------
  //                     METHODS
  // --------------------------------------------------

  /**
   * On init, set locale to France and check if user is authentificated.
   */
  ngOnInit() {
    this.authService.isAuthenticated();
  }
}
