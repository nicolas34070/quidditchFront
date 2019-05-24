import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {User} from "../../models/User";
import {UserDataService} from "../../services/user-data.service";

@Component({
  selector: 'app-arbitre-admin',
  templateUrl: './arbitre-admin.component.html',
  styleUrls: ['./arbitre-admin.component.css']
})
export class ArbitreAdminComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  usersList: User[];

  constructor(public userDataService: UserDataService) { }

  displayedColumns: string[] = ['idUtilisateur', 'nom'];
  dataSource: MatTableDataSource<User>  = null;

  async ngOnInit() {
    this.userDataService.getArbitres().subscribe((users: User[]) =>
    {
      this.usersList = users;
      this.dataSource = new MatTableDataSource(this.usersList);
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
