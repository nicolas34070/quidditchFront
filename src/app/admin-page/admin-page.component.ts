import { Component, OnInit } from '@angular/core';
import {AuthService} from '../core/services/auth.service';
import {Role} from '../enums/Role';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  active = 'tournois';

  onActive(event) {
    this.active = event;
  }

  constructor(private authService: AuthService, private router: Router) {
    const user = JSON.parse(this.authService.getUser());

    const userRole = user.roles[0];

    if (userRole !== Role.admin) {
        this.router.navigate(['/arbitre', user.idUtilisateur ]);
    }

  }

  ngOnInit() {
  }
}
