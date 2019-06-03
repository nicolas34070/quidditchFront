import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {EquipeDataService} from '../../services/equipe-data.service';
import {Equipe} from '../../models/Equipe';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EquipeAdminDetailsComponent} from './equipe-admin-details/equipe-admin-details.component';
import {ToasterService} from '../../core/services/toaster.service';
import {ColorPaletteTypes} from '../../enums/color-palette';

@Component({
  selector: 'app-equipe-admin',
  templateUrl: './equipe-admin.component.html',
  styleUrls: ['./equipe-admin.component.css']
})
export class EquipeAdminComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  equipesList: Equipe[];
  errorMessage = 'une erreur est survenue';

  constructor(private equipeDataService: EquipeDataService, private modalService: NgbModal, private toasterService: ToasterService) { }

  displayedColumns: string[] = ['nom'];
  dataSource: MatTableDataSource<Equipe>  = null;

  async ngOnInit() {
    this.onChange();
  }

  onChange() {
    this.equipeDataService.getEquipes().subscribe((equipes: Equipe[]) => {
      this.equipesList = equipes;
      this.dataSource = new MatTableDataSource(this.equipesList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      error => {
        this.errorMessage = error.error;
        this.toasterService.displayToast(this.errorMessage, ColorPaletteTypes.warn, 3000);
      }
      );
  }


  /**
   * Apply a filter
   * @param {String} filterValue - The text tapped by the user in the search bar
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  /**
   * editing
   */
  handleBtnKeyUp(equipe): void {
    const modalRef =  this.modalService.open(EquipeAdminDetailsComponent);
    modalRef.componentInstance.oldEquipe = equipe;
    modalRef. result.then(() => {
        this.onChange(); },
      () => {

      });
  }


  newEquipe() {
    const modalRef =  this.modalService.open(EquipeAdminDetailsComponent);
    modalRef. result.then(() => {
        this.onChange(); },
      () => {

      });
  }


}
