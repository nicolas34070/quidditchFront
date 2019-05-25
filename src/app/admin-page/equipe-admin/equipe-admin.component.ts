import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {EquipeDataService} from "../../services/equipe-data.service";
import {Equipe} from "../../models/Equipe";
import {PaysAdminDetailsComponent} from "../pays-admin/pays-admin-details/pays-admin-details.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EquipeAdminDetailsComponent} from "./equipe-admin-details/equipe-admin-details.component";

@Component({
  selector: 'app-equipe-admin',
  templateUrl: './equipe-admin.component.html',
  styleUrls: ['./equipe-admin.component.css']
})
export class EquipeAdminComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  equipesList: Equipe[];

  constructor(public equipeDataService: EquipeDataService, public _modalService: NgbModal) { }

  displayedColumns: string[] = ['nom'];
  dataSource: MatTableDataSource<Equipe>  = null;

  async ngOnInit() {
    this.onChange();
  }

  onChange() {
    this.equipeDataService.getEquipes().subscribe((equipes: Equipe[]) =>
    {
      this.equipesList = equipes;
      this.dataSource = new MatTableDataSource(this.equipesList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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
  handleBtnKeyUp(equipe): void {
    var modalRef =  this._modalService.open(EquipeAdminDetailsComponent);
    modalRef.componentInstance.oldEquipe = equipe;
    modalRef. result.then(() => {
        this.onChange() },
      () => {

      })
  }


  newEquipe() {
    var modalRef =  this._modalService.open(EquipeAdminDetailsComponent);
    modalRef. result.then(() => {
        this.onChange() },
      () => {

      })
  }


}
