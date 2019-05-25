import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Pays} from "../../models/Pays";
import {PaysDataService} from "../../services/pays-data.service";
import {TournoiAdminAddComponent} from "../tournoi-admin/tournoi-admin-add/tournoi-admin-add.component";
import {TournoiDataService} from "../../services/tournoi-date.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PaysAdminDetailsComponent} from "./pays-admin-details/pays-admin-details.component";

@Component({
  selector: 'app-pays-admin',
  templateUrl: './pays-admin.component.html',
  styleUrls: ['./pays-admin.component.css']
})
export class PaysAdminComponent implements OnInit {


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  paysList: Pays[];

  constructor(public paysDataService: PaysDataService, private _modalService: NgbModal) { }

  displayedColumns: string[] = ['nom'];
  dataSource: MatTableDataSource<Pays>  = null;

  async ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.paysDataService.getAllPays().subscribe((pays: Pays[]) =>
    {
      this.paysList = pays;
      this.dataSource = new MatTableDataSource(this.paysList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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




  /**
   * editing
   * @param {Pays}
   */
  handleBtnKeyUp(pays): void {
    var modalRef =  this._modalService.open(PaysAdminDetailsComponent);
    modalRef.componentInstance.oldPays = pays;
    modalRef. result.then(() => {
        this.onChange() },
      () => {

      })
  }


  newPays() {
    var modalRef =  this._modalService.open(PaysAdminDetailsComponent);
    modalRef. result.then(() => {
        this.onChange() },
      () => {

      })
  }


}
