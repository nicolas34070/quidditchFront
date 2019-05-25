import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Terrain} from "../../models/Terrain";
import {TerrainDataService} from "../../services/terrain-data.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TerrainAdminDetailsComponent} from "./terrain-admin-details/terrain-admin-details.component";

@Component({
  selector: 'app-terrain-admin',
  templateUrl: './terrain-admin.component.html',
  styleUrls: ['./terrain-admin.component.css']
})
export class TerrainAdminComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  terrainsList: Terrain[];

  constructor(public terrainDataService: TerrainDataService, public _modalService: NgbModal) { }

  displayedColumns: string[] = ['nom', 'lieu'];
  dataSource: MatTableDataSource<Terrain>  = null;

  async ngOnInit() {
    this.onChange();
  }

  onChange() {
    this.terrainDataService.getTerrains().subscribe((terrains: Terrain[]) =>
    {
      this.terrainsList = terrains;
      this.dataSource = new MatTableDataSource(this.terrainsList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = (data, filter) => {
        const dataStr = data.nom + data.lieu.nom  ;

        return dataStr.trim().toLocaleLowerCase().indexOf(filter) != -1;
      }
    });
  }

  /**
   * Apply a filter
   * @param {String} filterValue - The text tapped by the terrain in the search bar
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  /**
   * editing
   * @param {Terrain}
   */
  handleBtnKeyUp(terrain): void {
    var modalRef =  this._modalService.open(TerrainAdminDetailsComponent);
    modalRef.componentInstance.oldTerrain = terrain;
    modalRef. result.then(() => {
        this.onChange() },
      () => {

      })
  }


  newTerrain() {
    var modalRef =  this._modalService.open(TerrainAdminDetailsComponent);
    modalRef. result.then(() => {
        this.onChange() },
      () => {

      })
  }
}
