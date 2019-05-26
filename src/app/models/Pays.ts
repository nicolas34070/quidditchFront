

export class Pays {

  /**
   *
   * @param {number} [idPays] - The id of the pays
   * @param {String} [nom] - The name of the pays
   */
  constructor(
    public idPays: number,
    public nom?: string,
  ) { }




  /**
   * Converts an object with any type into a Pays object.
   * @param {number} [idPays] - The id of the pays
   * @param {String} [nom] - The name of the pays
   * @returns {Pays} - The pays object created from data values
   */
  static mapToPays(data: any): Pays {
    return new Pays(data.idPays, data.nom);
  }

}
