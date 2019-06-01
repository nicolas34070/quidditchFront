import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Tournoi} from "../../models/Tournoi";
import {TournoiDataService} from "../../services/tournoi-date.service";
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalScoreComponent} from "../../match-page/modal-score/modal-score.component";
import {TournoiAdminAddComponent} from "./tournoi-admin-add/tournoi-admin-add.component";
import {ToasterService} from "../../core/services/toaster.service";
import {ColorPaletteTypes} from "../../enums/color-palette";

@Component({
  selector: 'app-tournoi-admin',
  templateUrl: './tournoi-admin.component.html',
  styleUrls: ['./tournoi-admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TournoiAdminComponent implements OnInit, OnChanges {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  tournoisList: Tournoi[];
  errorMessage = "une erreur est survenue";

  constructor(public tournoiDataService: TournoiDataService, private _modalService: NgbModal, private toasterService: ToasterService) { }

  displayedColumns: string[] = ['nom', 'dateDebut', 'dateFin', 'pays'];
  dataSource: MatTableDataSource<Tournoi>  = null;

  async ngOnInit() {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }

  onChange() {
    this.loadData();
  }

  /**
   * Apply a filter
   * @param {String} filterValue - The text tapped by the user in the search bar
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  loadData(){
    this.tournoiDataService.getTournois().subscribe((tournois: Tournoi[]) =>
    {
      this.tournoisList = tournois;
      this.dataSource = new MatTableDataSource(this.tournoisList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = (data, filter) => {
        let dataFinfilter = data.dateFin == null ? "Tournoi en cours" : data.dateFin.locale("FR").format("L");
        const dataStr = data.nom +  data.dateDebut.locale("FR").format("L") + dataFinfilter + data.pays;

        return dataStr.trim().toLocaleLowerCase().indexOf(filter) != -1;
      }
    },
      error => {
        this.errorMessage = error.error;
        this.toasterService.displayToast(this.errorMessage, ColorPaletteTypes.warn, 3000);
      });
  }



  /**
   * Open editing project sidebar
   * @param {Tournoi} element - The project id.
   */
  handleBtnKeyUp(tournoi): void {
    var modalRef =  this._modalService.open(TournoiAdminAddComponent);
    modalRef.componentInstance.oldTournoi = tournoi ;
    modalRef. result.then(() => {
       this.onChange() },
      () => {

      })

  }

  addNewProject() {
    var modalRef =  this._modalService.open(TournoiAdminAddComponent);
    modalRef. result.then(() => {
        this.onChange() },
      () => {

      })

  }

}
