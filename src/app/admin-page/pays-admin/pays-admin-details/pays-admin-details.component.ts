import {Component, Input, OnInit} from '@angular/core';
import {Pays} from "../../../models/Pays";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PaysDataService} from "../../../services/pays-data.service";
import {ToasterService} from "../../../core/services/toaster.service";
import {ColorPaletteTypes} from "../../../enums/color-palette";

@Component({
  selector: 'app-pays-admin-details',
  templateUrl: './pays-admin-details.component.html',
  styleUrls: ['./pays-admin-details.component.css']
})
export class PaysAdminDetailsComponent implements OnInit {


  @Input() oldPays?: Pays;

  angForm: FormGroup;
  errorMessage = "une erreur est survenue";

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, public paysDataService: PaysDataService, private toasterService: ToasterService) {
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
    let pays = Pays.mapToPays(this.angForm.value);

    if (this.oldPays != null) {
      pays.idPays = this.oldPays.idPays;
      this.paysDataService.updatePays(pays).subscribe((pays: Pays) => {
        this.activeModal.close();
      },
        error => {
          this.errorMessage = error.error;
          this.toasterService.displayToast(this.errorMessage, ColorPaletteTypes.warn, 3000);
        });
    } else {
      this.paysDataService.addPays(pays).subscribe((pays: Pays) => {
        this.activeModal.close();
      },
        error => {
          this.errorMessage = error.error;
          this.toasterService.displayToast(this.errorMessage, ColorPaletteTypes.warn, 3000);
        });
    }
  }

  delete() {
    this.paysDataService.deletePays(this.oldPays).subscribe((pays: Pays) => {
      this.activeModal.close()
    },
      error => {
        this.errorMessage = error.error;
        this.toasterService.displayToast(this.errorMessage, ColorPaletteTypes.warn, 3000);
      });
  }
}
