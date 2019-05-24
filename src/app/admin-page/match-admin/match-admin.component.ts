import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Match} from "../../models/Match";
import {MatchDataService} from "../../services/match-data.service";

@Component({
  selector: 'app-match-admin',
  templateUrl: './match-admin.component.html',
  styleUrls: ['./match-admin.component.css']
})
export class MatchAdminComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  matchsList: Match[];

  constructor(public matchDataService: MatchDataService) { }

  displayedColumns: string[] = ['idMatch', 'tournoi', 'premiereEquipe', 'deuxiemeEquipe', 'terrain', 'dateDebut', 'dateFin'];
  dataSource: MatTableDataSource<Match>  = null;

  async ngOnInit() {
    this.matchDataService.getMatchs().subscribe((matchs: Match[]) =>
    {
      this.matchsList = matchs;
      this.dataSource = new MatTableDataSource(this.matchsList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = (data, filter) => {
        let dataFinfilter = data.dateFin == null ? "Tournoi en cours" : data.dateFin.locale("FR").format("L");
        const dataStr = data.tournoi.nom + data.premiereEquipe.nom + data.deuxiemeEquipe.nom + data.terrain.nom + data.dateDebut.locale("FR").format("L") + dataFinfilter;

        return dataStr.trim().toLocaleLowerCase().indexOf(filter) != -1;
      }

    });



  }


  /**
   * Apply a filter
   * @param {String} filterValue - The text tapped by the match in the search bar
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
