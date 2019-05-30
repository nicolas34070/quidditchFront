import {Component, Input, OnInit} from '@angular/core';
import {Equipe} from "../../../models/Equipe";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EquipeDataService} from "../../../services/equipe-data.service";

@Component({
  selector: 'app-equipe-admin-details',
  templateUrl: './equipe-admin-details.component.html',
  styleUrls: ['./equipe-admin-details.component.css']
})
export class EquipeAdminDetailsComponent implements OnInit {

  @Input() oldEquipe?: Equipe;

  angForm: FormGroup;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, public equipeDataService: EquipeDataService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      nom: ['', Validators.required ]
    });
  }


  ngOnInit() {
  }


  save() {
    let equipe = Equipe.mapToEquipe(this.angForm.value);

    if (this.oldEquipe != null) {
      equipe.idEquipe = this.oldEquipe.idEquipe;
      this.equipeDataService.updateEquipe(equipe).subscribe((equipe: Equipe) => {
        this.activeModal.close();
      });
    } else {
      this.equipeDataService.addEquipe(equipe).subscribe((equipe: Equipe) => {
        this.activeModal.close();
      });
    }
  }

  delete() {
    this.equipeDataService.deleteEquipe(this.oldEquipe).subscribe((equipe: Equipe) => {
      this.activeModal.close()
    });
  }

}
