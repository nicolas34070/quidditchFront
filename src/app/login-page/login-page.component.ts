import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserDataService} from "../services/user-data.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Role} from "../enums/Role";
import {AuthService} from "../core/services/auth.service";
import {ColorPaletteTypes} from "../enums/color-palette";
import {ToasterService} from "../core/services/toaster.service";
import {User} from "../models/User";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  angForm: FormGroup;
  errorMessage: string;

  constructor(private userDataService: UserDataService, private fb: FormBuilder, private router: Router, private authService: AuthService
  , private toasterService: ToasterService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      username: ['',[Validators.required] ],
      password: ['', Validators.required ]
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      var user  = JSON.parse(localStorage.getItem('user'));
      this.changeRoute(user)
    }
  }

  changeRoute(user: User) {
    if ( user.roles[0] == Role.admin || user.roles[1] == Role.admin) {
      this.router.navigate(['admin'])
    } else if ( user.roles[0] == Role.arbitre || user.roles[1] == Role.arbitre) {
      let route = 'arbitre/' + user.idUtilisateur
      this.router.navigate([route])
    }
  }

  /**
   * Session login
   * @returns valid login
   */
  async login() {
     await this.authService.login(this.angForm.value).subscribe(
        (token) => {
          this.authService.getUsername(this.angForm.value, token['access_token']).subscribe(
            (user) => {

              this.changeRoute(user);
            },
            error => {
              this.errorMessage = error.error["error_description"];
              this.toasterService.displayToast(this.errorMessage, ColorPaletteTypes.warn, 3000);
            }
          );

        },
        error => {
          this.errorMessage = error.error["error_description"];
          this.toasterService.displayToast(this.errorMessage, ColorPaletteTypes.warn, 3000);
        }
      );
  }

}
