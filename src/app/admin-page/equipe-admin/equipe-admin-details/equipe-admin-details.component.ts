import {Component, Input, OnInit} from '@angular/core';
import {Equipe} from "../../../models/Equipe";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EquipeDataService} from "../../../services/equipe-data.service";
import {ToasterService} from "../../../core/services/toaster.service";
import {ColorPaletteTypes} from "../../../enums/color-palette";

@Component({
  selector: 'app-equipe-admin-details',
  templateUrl: './equipe-admin-details.component.html',
  styleUrls: ['./equipe-admin-details.component.css']
})
export class EquipeAdminDetailsComponent implements OnInit {

  @Input() oldEquipe?: Equipe;

  angForm: FormGroup;
  errorMessage = "une erreur est survenue";

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, public equipeDataService: EquipeDataService, private toasterService: ToasterService) {
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
      this.equipeDataService.updateEquipe(equipe).subscribe(
        (equipe: Equipe) => {
        this.activeModal.close();
      },
        error => {
          this.errorMessage = error.error;
          this.toasterService.displayToast(this.errorMessage, ColorPaletteTypes.warn, 3000);
        }
      );
    } else {
      this.equipeDataService.addEquipe(equipe).subscribe(
        (equipe: Equipe) => {
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
    this.equipeDataService.deleteEquipe(this.oldEquipe).subscribe((equipe: Equipe) => {
      this.activeModal.close()
    },
      error => {
        this.errorMessage = error.error;
        this.toasterService.displayToast(this.errorMessage, ColorPaletteTypes.warn, 3000);
      });
  }

}
