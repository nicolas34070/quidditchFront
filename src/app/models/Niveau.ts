

export class Niveau {

  /**
   *
   * @param {number} [idNiveau] - The id of the pays
   * @param {String} [nom] - The name of the pays
   */
  constructor(
    public idNiveau: number,
    public nom?: string,
  ) { }




  /**
   * Converts an object with any type into a Pays object.
   * @param {number} [idNiveau] - The id of the pays
   * @param {String} [nom] - The name of the pays
   * @returns {Niveau} - The pays object created from data values
   */
  static mapToNiveau(data: any): Niveau {
    return new Niveau(data.idNiveau, data.nom);
  }

}
