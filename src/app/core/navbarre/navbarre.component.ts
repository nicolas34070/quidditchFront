import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {User} from '../../models/User';
import {AuthService} from '../services/auth.service';
import {Role} from '../../enums/Role';

@Component({
  selector: 'app-navbarre',
  templateUrl: './navbarre.component.html',
  styleUrls: ['./navbarre.component.css']
})
export class NavbarreComponent implements OnInit, OnChanges {

  user: User;

  admin = Role.admin;
  arbitre = Role.arbitre;

  constructor(private authService: AuthService) {
    authService.getLoggedInName.subscribe(user => this.changeUser(user));
  }

   ngOnInit() {
     this.user  =  JSON.parse(localStorage.getItem('user')) || null ;
  }

   ngOnChanges(changes: SimpleChanges) {
    this.user  =  JSON.parse(localStorage.getItem('user')) || null ;
  }
  /**
   * Log out the User
   */
  logout(): void {
    this.authService.logout();
  }

  private changeUser(user: User): void {
    this.user = user;
  }

}
