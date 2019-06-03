import {Component, Input, OnInit} from '@angular/core';
import {Pays} from '../../../models/Pays';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PaysDataService} from '../../../services/pays-data.service';
import {ColorPaletteTypes} from '../../../enums/color-palette';

@Component({
  selector: 'app-pays-admin-details',
  templateUrl: './pays-admin-details.component.html',
  styleUrls: ['./pays-admin-details.component.css']
})
export class PaysAdminDetailsComponent implements OnInit {


  @Input() oldPays?: Pays;

  angForm: FormGroup;
  errorMessage = 'une erreur est survenue';

  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal, private paysDataService: PaysDataService) {
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
    const pays = Pays.mapToPays(this.angForm.value);

    if (this.oldPays != null) {
      pays.idPays = this.oldPays.idPays;
      this.paysDataService.updatePays(pays).subscribe(() => {
        this.activeModal.close();
      });
    } else {
      this.paysDataService.addPays(pays).subscribe(() => {
        this.activeModal.close();
      });
    }
  }

  delete() {
    this.paysDataService.deletePays(this.oldPays).subscribe(() => {
      this.activeModal.close();
    });
  }
}
