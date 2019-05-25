import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Pays} from "../../models/Pays";
import {PaysDataService} from "../../services/pays-data.service";

@Component({
  selector: 'app-pays-admin',
  templateUrl: './pays-admin.component.html',
  styleUrls: ['./pays-admin.component.css']
})
export class PaysAdminComponent implements OnInit {


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  paysList: Pays[];

  constructor(public paysDataService: PaysDataService) { }

  displayedColumns: string[] = ['nom'];
  dataSource: MatTableDataSource<Pays>  = null;

  async ngOnInit() {
    this.paysDataService.getAllPays().subscribe((pays: Pays[]) =>
    {
      this.paysList = pays;
      this.dataSource = new MatTableDataSource(this.paysList);
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
