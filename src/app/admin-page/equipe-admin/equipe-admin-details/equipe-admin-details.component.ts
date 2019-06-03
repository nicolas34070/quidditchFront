import {Component, Input, OnInit} from '@angular/core';
import {Equipe} from '../../../models/Equipe';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {EquipeDataService} from '../../../services/equipe-data.service';


@Component({
  selector: 'app-equipe-admin-details',
  templateUrl: './equipe-admin-details.component.html',
  styleUrls: ['./equipe-admin-details.component.css']
})
export class EquipeAdminDetailsComponent implements OnInit {

  @Input() oldEquipe?: Equipe;

  angForm: FormGroup;
  errorMessage = 'une erreur est survenue';

  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal, private equipeDataService: EquipeDataService) {
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
    const equipe = Equipe.mapToEquipe(this.angForm.value);

    if (this.oldEquipe != null) {
      equipe.idEquipe = this.oldEquipe.idEquipe;
      this.equipeDataService.updateEquipe(equipe).subscribe(
        () => {
        this.activeModal.close();
      });
    } else {
      this.equipeDataService.addEquipe(equipe).subscribe(
        () => {
        this.activeModal.close();
      });
    }
  }

  delete() {
    this.equipeDataService.deleteEquipe(this.oldEquipe).subscribe((equipe: Equipe) => {
      this.activeModal.close();
    });
  }

}
