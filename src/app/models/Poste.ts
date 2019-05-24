export class Poste {

  /**
   *
   * @param {number} [idPoste] - The id of the poste
   * @param {String} [score] - The name of the poste
   */
  constructor(
    public idPoste: number,
    public nom?: string,
  ) { }




  /**
   *
   * @param {number} [idMatch] - The id of the poste
   * @param {String} [score] - The name of the poste
   */
  static mapToPoste(data: any): Poste {
    return new Poste(data.idPoste, data.nom);
  }

}
