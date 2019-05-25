import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Joueur} from "../../models/Joueur";
import {JoueurDataService} from "../../services/joueur-data.service";
import {JoueurAdminDetailsComponent} from "../joueur-admin/joueur-admin-details/joueur-admin-details.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-joueur-admin',
  templateUrl: './joueur-admin.component.html',
  styleUrls: ['./joueur-admin.component.css']
})
export class JoueurAdminComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  joueursList: Joueur[];

  constructor(public joueurDataService: JoueurDataService, public _modalService : NgbModal) { }

  displayedColumns: string[] = ['nom', 'nationalite', 'poste', 'equipe'];
  dataSource: MatTableDataSource<Joueur>  = null;

  async ngOnInit() {
    this.onChange();
  }

  onChange() {
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
   * editing
   * @param {Pays}
   */
  handleBtnKeyUp(joueur): void {
    var modalRef =  this._modalService.open(JoueurAdminDetailsComponent);
    modalRef.componentInstance.oldJoueur = joueur;
    modalRef. result.then(() => {
        this.onChange() },
      () => {

      })
  }


  newJoueur() {
    var modalRef =  this._modalService.open(JoueurAdminDetailsComponent);
    modalRef. result.then(() => {
        this.onChange() },
      () => {

      })
  }

}
