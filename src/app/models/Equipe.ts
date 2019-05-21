export class Equipe {

  /**
   *
   * @param {number} [idEquipe] - The id of the equipe
   * @param {String} [score] - The name of the equipe
   */
  constructor(
    public idEquipe: number,
    public nom?: string,
  ) { }




  /**
   *
   * @param {number} [idMatch] - The id of the equipe
   * @param {String} [score] - The name of the equipe
   */
  static mapToEquipe(data: any): Equipe {
    return new Equipe(data.idEquipe, data.nom);
  }

}
