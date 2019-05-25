import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {UserDataService} from "../../../services/user-data.service";

@Component({
  selector: 'app-arbitre-admin-details',
  templateUrl: './arbitre-admin-details.component.html',
  styleUrls: ['./arbitre-admin-details.component.css']
})
export class ArbitreAdminDetailsComponent implements OnInit {


  @Input() oldArbitre?: User;

  angForm: FormGroup;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, public arbitreDataService: UserDataService) {
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
    arbitre.nom = this.angForm.value.nom;
    arbitre.email = this.angForm.value.email;


    if (this.oldArbitre != null) {
      arbitre.idUtilisateur = this.oldArbitre.idUtilisateur;
      this.arbitreDataService.updateUser(arbitre).subscribe((arbitre: User) => {
        this.activeModal.close();
      });
    } else {
      this.arbitreDataService.addUser(arbitre).subscribe((arbitre: User) => {
        this.activeModal.close();
      });
    }
  }

  delete() {
    this.arbitreDataService.deleteUser(this.oldArbitre).subscribe((arbitre: User) => {
      this.activeModal.close()
    });
  }

}
