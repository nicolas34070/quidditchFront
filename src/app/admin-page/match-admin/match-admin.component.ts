import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Match} from '../../models/Match';
import {MatchDataService} from '../../services/match-data.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatchAdminDetailsComponent} from './match-admin-details/match-admin-details.component';
import {ToasterService} from '../../core/services/toaster.service';

@Component({
  selector: 'app-match-admin',
  templateUrl: './match-admin.component.html',
  styleUrls: ['./match-admin.component.css']
})
export class MatchAdminComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  matchsList: Match[];
  errorMessage = 'une erreur est survenue';

  constructor(public matchDataService: MatchDataService, public modalService: NgbModal, private toasterService: ToasterService) { }

  displayedColumns: string[] = [ 'tournoi', 'premiereEquipe', 'deuxiemeEquipe',  'arbitre', 'terrain', 'dateDebut', 'dateFin'];
  dataSource: MatTableDataSource<Match>  = null;

  async ngOnInit() {
    this.onChange();
  }

  onChange() {
    this.matchDataService.getMatchs().subscribe((matchs: Match[]) => {
      this.matchsList = matchs;
      this.dataSource = new MatTableDataSource(this.matchsList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = (data, filter) => {
        const dataFinfilter = data.dateFin == null ? 'Tournoi en cours' : data.dateFin.locale('FR').format('L');
        const dataStr = data.tournoi.nom + data.premiereEquipe.nom + data.deuxiemeEquipe.nom + data.terrain.nom +
          data.dateDebut.locale('FR').format('L') + dataFinfilter;

        return dataStr.trim().toLocaleLowerCase().indexOf(filter) !== -1;
      };
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
   * editing
   */
  handleBtnKeyUp(match): void {
    const modalRef =  this.modalService.open(MatchAdminDetailsComponent);
    modalRef.componentInstance.oldMatch = match;
    modalRef. result.then(() => {
        this.onChange(); },
      () => {

      });
  }


  newMatch() {
    const modalRef =  this.modalService.open(MatchAdminDetailsComponent);
    modalRef. result.then(() => {
        this.onChange(); },
      () => {

      });
  }
}
