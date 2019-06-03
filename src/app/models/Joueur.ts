import {Equipe} from './Equipe';
import {Poste} from './Poste';
import {Pays} from './Pays';
import {Niveau} from './Niveau';


export class Joueur {

  /**
   *
   * @param {number} [idJoueur] - The id of the joueur
   * @param {String} [nom] - The name of the joueur
   * @param {number} [age] - The role of the joueur
   * @param {Pays} [nationalite] - The nationalite of the joueur
   * @param {Poste} [poste] - The poste of the joueur
   * @param {Equipe} [equipe] - The equipe of the joueur
   * @param {Niveau} [league] - The level of the joueur
   */
  constructor(
    public idJoueur: number,
    public nom?: string,
    public age?: number,
    public nationalite?: Pays,
    public poste?: Poste,
    public equipe?: Equipe,
    public league?: Niveau
  ) { }




  /**
   * Converts an object with any type into a Joueur object.
   * @param {number} [id] - The id of the joueur
   * @param {String} [nom] - The name of the joueur
   * @param {number} [age] - The role of the joueur
   * @param {Poste} [poste] - The poste of the joueur
   * @param {Pays} [nationalite] - The nationalite of the joueur
   * @param {Equipe} [equipe] - The equipe of the joueur
   * @param {Niveau} [league] - The level of the joueur
   * @returns {Joueur} - The joueur object created from data values
   */
  static mapToJoueur(data: any): Joueur {
    const nationalite = Pays.mapToPays(data.nationalite);
    const equipe = Equipe.mapToEquipe(data.equipe);
    const poste = Poste.mapToPoste(data.poste);
    const niveau = Niveau.mapToNiveau(data.league);
    return new Joueur(data.idJoueur, data.nom, data.age,  nationalite, poste, equipe, niveau);
  }
}
