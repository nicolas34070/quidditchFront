import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserDataService} from "../../../services/user-data.service";
import {ColorPaletteTypes} from "../../../enums/color-palette";
import {ToasterService} from "../../../core/services/toaster.service";

@Component({
  selector: 'app-arbitre-admin-details',
  templateUrl: './arbitre-admin-details.component.html',
  styleUrls: ['./arbitre-admin-details.component.css']
})
export class ArbitreAdminDetailsComponent implements OnInit {


  @Input() oldArbitre?: User;

  angForm: FormGroup;
  errorMessage = "une erreur est survenue";

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, public arbitreDataService: UserDataService, private toasterService: ToasterService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      nom: ['', Validators.required ],
      email: ['', Validators.required ]
    });
  }


  ngOnInit() {
  }


  save() {
    let arbitre = new User();
    arbitre.username = this.angForm.value.nom;
    arbitre.email = this.angForm.value.email;


    if (this.oldArbitre != null) {
      arbitre.idUtilisateur = this.oldArbitre.idUtilisateur;
      this.arbitreDataService.updateUser(arbitre).subscribe(
        (arbitre: User) => {
        this.activeModal.close();
      },
        error => {
          this.errorMessage = error.error;
          this.toasterService.displayToast(this.errorMessage, ColorPaletteTypes.warn, 3000);
        }
      );
    } else {
      this.arbitreDataService.addUser(arbitre).subscribe(
        (arbitre: User) => {
        this.activeModal.close();
       },
        error => {
          this.errorMessage = error.error;
          this.toasterService.displayToast(this.errorMessage, ColorPaletteTypes.warn, 3000);
        }
      );
    }
  }

  delete() {
    this.arbitreDataService.deleteUser(this.oldArbitre).subscribe((arbitre: User) => {
      this.activeModal.close()
    },
      error => {
        this.errorMessage = error.error;
        this.toasterService.displayToast(this.errorMessage, ColorPaletteTypes.warn, 3000);
      }
      );
  }

}
