export class Equipe {

  /**
   *
   * @param {number} [idEquipe] - The id of the equipe
   * @param {String} [nom] - The name of the equipe
   */
  constructor(
    public idEquipe?: number,
    public nom?: string,
  ) { }




  /**
   *
   * @param {number} [idEquipe] - The id of the equipe
   * @param {String} [nom] - The name of the equipe
   * @returns {Equipe} - The equipe object created from data values
   */
  static mapToEquipe(data: any): Equipe {
    return new Equipe(data.idEquipe, data.nom);
  }

}
