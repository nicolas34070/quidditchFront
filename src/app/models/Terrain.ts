export class Terrain {

  /**
   *
   * @param {number} [idTerrain] - The id of the terrain
   * @param {String} [nom] - The name of the terrain
   * @param {String} [lieu] - The id of the lieu..
   */
  constructor(
    public idTerrain: number,
    public nom?: string,
    public lieu?: number
  ) { }




  /**
   *
   * @param {number} [idTerrain] - The id of the terrain
   * @param {String} [nom] - The name of the terrain
   * @param {String} [lieu] - The id of the lieu..
   */
  static mapToTerrain(data: any): Terrain {
    return new Terrain(data.idTerrain, data.nom, data.lieu);
  }

}
