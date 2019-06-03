import {Component, Input, OnInit} from '@angular/core';
import {Terrain} from '../../../models/Terrain';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TerrainDataService} from '../../../services/terrain-data.service';
import {Pays} from '../../../models/Pays';
import {PaysDataService} from '../../../services/pays-data.service';
import {ToasterService} from '../../../core/services/toaster.service';
import {ColorPaletteTypes} from '../../../enums/color-palette';

@Component({
  selector: 'app-terrain-admin-details',
  templateUrl: './terrain-admin-details.component.html',
  styleUrls: ['./terrain-admin-details.component.css']
})
export class TerrainAdminDetailsComponent implements OnInit {


  @Input() oldTerrain?: Terrain;
  lieuList: Pays[] = [];
  default: number;
  angForm: FormGroup;
  errorMessage = 'une erreur est survenue';

  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal,
              private terrainDataService: TerrainDataService,
              private paysDataService: PaysDataService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      nom: ['', Validators.required],
      lieu: ['', Validators.required]
    });
  }


  async ngOnInit() {
    this.paysDataService.getAllPays().subscribe((pays: Pays[]) => {
      this.lieuList = pays;
      this.default =  this.oldTerrain != null ? this.oldTerrain.lieu.idPays : this.lieuList[0].idPays;
    });
  }


  save() {
    const terrain = Terrain.mapToTerrain(this.angForm.value);
    terrain.lieu.idPays = this.angForm.value.lieu;

    if (this.oldTerrain != null) {
      terrain.idTerrain = this.oldTerrain.idTerrain;
      this.terrainDataService.updateTerrain(terrain).subscribe(() => {
        this.activeModal.close();
      });
    } else {
      this.terrainDataService.addTerrain(terrain).subscribe(() => {
        this.activeModal.close();
      });
    }
  }

  delete() {
    this.terrainDataService.deleteTerrain(this.oldTerrain).subscribe((terrain: Terrain) => {
      this.activeModal.close();
    });
  }
}
