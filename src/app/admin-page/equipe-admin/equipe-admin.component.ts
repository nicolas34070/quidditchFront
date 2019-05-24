import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {EquipeDataService} from "../../services/equipe-date.service";
import {Equipe} from "../../models/Equipe";

@Component({
  selector: 'app-equipe-admin',
  templateUrl: './equipe-admin.component.html',
  styleUrls: ['./equipe-admin.component.css']
})
export class EquipeAdminComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  equipesList: Equipe[];

  constructor(public equipeDataService: EquipeDataService) { }

  displayedColumns: string[] = ['idEquipe', 'nom'];
  dataSource: MatTableDataSource<Equipe>  = null;

  async ngOnInit() {
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
   * Open editing project sidebar
   * @param {String} id - The project id.
   */
  handleBtnKeyUp(id: string): void {

  }


}
