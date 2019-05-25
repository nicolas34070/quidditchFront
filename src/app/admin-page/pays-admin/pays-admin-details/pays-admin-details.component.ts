import {Component, Input, OnInit} from '@angular/core';
import {Pays} from "../../../models/Pays";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PaysDataService} from "../../../services/pays-data.service";

@Component({
  selector: 'app-pays-admin-details',
  templateUrl: './pays-admin-details.component.html',
  styleUrls: ['./pays-admin-details.component.css']
})
export class PaysAdminDetailsComponent implements OnInit {


  @Input() oldPays?: Pays;

  angForm: FormGroup;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, public paysDataService: PaysDataService) {
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
    console.log(this.angForm.value);
    let pays = Pays.mapToPays(this.angForm.value);

    if (this.oldPays != null) {
      pays.idPays = this.oldPays.idPays;
      this.paysDataService.updatePays(pays).subscribe((pays: Pays) => {
        this.activeModal.close();
      });
    } else {
      this.paysDataService.addPays(pays).subscribe((pays: Pays) => {
        this.activeModal.close();
      });
    }
  }

  delete() {
    this.paysDataService.deletePays(this.oldPays).subscribe((pays: Pays) => {
      this.activeModal.close()
    });
  }
}
