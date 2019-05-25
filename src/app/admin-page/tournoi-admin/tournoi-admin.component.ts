import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Tournoi} from "../../models/Tournoi";
import {TournoiDataService} from "../../services/tournoi-date.service";
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-tournoi-admin',
  templateUrl: './tournoi-admin.component.html',
  styleUrls: ['./tournoi-admin.component.css']
})
export class TournoiAdminComponent implements OnInit, OnChanges {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  tournoisList: Tournoi[];

  constructor(public tournoiDataService: TournoiDataService) { }

  displayedColumns: string[] = ['idTournoi', 'nom', 'dateDebut', 'dateFin', 'pays'];
  dataSource: MatTableDataSource<Tournoi>  = null;

  async ngOnInit() {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("hello");
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
    });
  }



  /**
   * Open editing project sidebar
   * @param {String} id - The project id.
   */
  handleBtnKeyUp(id: string): void {

  }

}
