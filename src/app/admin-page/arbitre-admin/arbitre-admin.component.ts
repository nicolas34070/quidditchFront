import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {User} from "../../models/User";
import {UserDataService} from "../../services/user-data.service";
import {PaysAdminDetailsComponent} from "../pays-admin/pays-admin-details/pays-admin-details.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ArbitreAdminDetailsComponent} from "./arbitre-admin-details/arbitre-admin-details.component";
import {ColorPaletteTypes} from "../../enums/color-palette";
import {ToasterService} from "../../core/services/toaster.service";

@Component({
  selector: 'app-arbitre-admin',
  templateUrl: './arbitre-admin.component.html',
  styleUrls: ['./arbitre-admin.component.css']
})
export class ArbitreAdminComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  usersList: User[];
  errorMessage = "une erreur est survenue";

  constructor(public userDataService: UserDataService, public _modalService: NgbModal, private toasterService: ToasterService) {
  }

  displayedColumns: string[] = ['nom', 'email'];
  dataSource: MatTableDataSource<User> = null;

  async ngOnInit() {
    this.onChange();
  }

  onChange() {
    this.userDataService.getArbitres().subscribe(
      (users: User[]) => {
      this.usersList = users;
      this.dataSource = new MatTableDataSource(this.usersList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
       },
      error => {
        this.errorMessage = error.error;
        this.toasterService.displayToast(this.errorMessage, ColorPaletteTypes.warn, 3000);
      }
    );
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
   * @param {Utilisateur}
   */
  handleBtnKeyUp(arbitre): void {
    var modalRef = this._modalService.open(ArbitreAdminDetailsComponent);
    modalRef.componentInstance.oldArbitre = arbitre;
    modalRef.result.then(() => {
        this.onChange()
      },
      () => {

      })
  }


  newArbitre() {
    var modalRef = this._modalService.open(ArbitreAdminDetailsComponent);
    modalRef.result.then(() => {
        this.onChange()
      },
      () => {

      })
  }
}
