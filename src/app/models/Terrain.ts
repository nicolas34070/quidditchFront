import {Pays} from './Pays';

export class Terrain {

  /**
   *
   * @param {number} [idTerrain] - The id of the terrain
   * @param {String} [nom] - The name of the terrain
   * @param {Pays} [lieu] - The id of the lieu..
   */
  constructor(
    public idTerrain?: number,
    public nom?: string,
    public lieu?: Pays
  ) { }




  /**
   *
   * @param {number} [idTerrain] - The id of the terrain
   * @param {String} [nom] - The name of the terrain
   * @param {String} [lieu] - The id of the lieu..
   * @returns {Terrain} - The user object created from data values
   */
  static mapToTerrain(data: any): Terrain {
    const lieu = Pays.mapToPays(data.lieu);
    return new Terrain(data.idTerrain, data.nom, lieu);
  }

}
