import DateTimeFormat = Intl.DateTimeFormat;
import {User} from "./User";
import {Equipe} from "./Equipe";
import {Terrain} from "./Terrain";


export class Match {

  /**
   *
   * @param {number} [idMatch] - The id of the match
   * @param {String} [score] - The score of the match
   * @param {number} [temps] - The time of the match
   * @param {DateTimeFormat} [date] - The date of the match
   * @param {Object} [arbitre] - The arbitre of the match
   * @param {Object} [terrain] - The terrain of the match
   * @param {Object} [premiereEquipe] - The first team
   * @param {Object} [deuxiemeEquipe] - The second team
   */
  constructor(
    public idMatch: number,
    public score?: string,
    public temps?: number,
    public date?: DateTimeFormat,
    public arbitre?: User,
    public terrain?: Terrain,
    public premiereEquipe?: Equipe,
    public deuxiemeEquipe?: Equipe

  ) { }




  /**
   *
   * @param {number} [idMatch] - The id of the match
   * @param {String} [score] - The score of the match
   * @param {number} [temps] - The time of the match
   * @param {DateTimeFormat} [date] - The date of the match
   * @param {Object} [arbitre] - The arbitre of the match
   * @param {Object} [terrain] - The terrain of the match
   * @param {Object} [premiereEquipe] - The first team
   * @param {Object} [deuxiemeEquipe] - The second team
   */
  static mapToMatch(data: any): Match {

    let arbitre = User.mapToUser(data.arbitre);
    let terrain = Terrain.mapToTerrain(data.terrain);
    let premiereEquipe = Equipe.mapToEquipe(data.premiereEquipe);
    let secondEquipe = Equipe.mapToEquipe(data.deuxiemeEquipe);
    return new Match(data.idMatch, data.score, data.temps, data.date, arbitre, terrain,
      premiereEquipe, secondEquipe);
  }

}
