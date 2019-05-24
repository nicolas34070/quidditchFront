import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Joueur} from "../../models/Joueur";
import {JoueurDataService} from "../../services/joueur-data.service";

@Component({
  selector: 'app-joueur-admin',
  templateUrl: './joueur-admin.component.html',
  styleUrls: ['./joueur-admin.component.css']
})
export class JoueurAdminComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  joueursList: Joueur[];

  constructor(public joueurDataService: JoueurDataService) { }

  displayedColumns: string[] = ['idJoueur', 'nom', 'nationalite', 'poste', 'equipe'];
  dataSource: MatTableDataSource<Joueur>  = null;

  async ngOnInit() {
    this.joueurDataService.getJoueurs().subscribe((joueurs: Joueur[]) =>
    {
      this.joueursList = joueurs;
      this.dataSource = new MatTableDataSource(this.joueursList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = (data, filter) => {
        const dataStr = data.nom + data.nationalite.nom + data.poste.nom + data.equipe.nom ;

        return dataStr.trim().toLocaleLowerCase().indexOf(filter) != -1;
      }
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
