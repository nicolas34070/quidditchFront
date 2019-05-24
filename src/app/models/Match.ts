import DateTimeFormat = Intl.DateTimeFormat;
import {User} from "./User";
import {Equipe} from "./Equipe";
import {Terrain} from "./Terrain";
import * as moment from 'moment';
import {Moment} from "moment";
import {Tournoi} from "./Tournoi";


export class Match {

  /**
   *
   * @param {number} [idMatch] - The id of the match
   * @param {number} [scorePremiereEquipe] - The score of the match
   * @param {number} [scoreDeuxiemeEquipe] - The score of the match
   * @param {number} [temps] - The time of the match
   * @param {DateTimeFormat} [dateDebut] - The date of the match
   * @param {DateTimeFormat} [dateFin] - The date of the match
   * @param {Object} [arbitre] - The arbitre of the match
   * @param {Object} [terrain] - The terrain of the match
   * @param {Object} [premiereEquipe] - The first team
   * @param {Object} [deuxiemeEquipe] - The second team
   * @param {Object} [tournoi] - The tournoi
   */
  constructor(
    public idMatch: number,
    public scorePremiereEquipe?: number,
    public scoreDeuxiemeEquipe?: number,
    public temps?: number,
    public dateDebut?: Moment,
    public dateFin?: Moment,
    public arbitre?: User,
    public terrain?: Terrain,
    public tournoi?: Tournoi,
    public premiereEquipe?: Equipe,
    public deuxiemeEquipe?: Equipe

  ) { }




  /**
   *
   * @param {number} [idMatch] - The id of the match
   * @param {number} [scorePremiereEquipe] - The score of the match
   * @param {number} [scoreDeuxiemeEquipe] - The score of the match
   * @param {number} [temps] - The time of the match
   * @param {DateTimeFormat} [date] - The date of the match
   * @param {Object} [arbitre] - The arbitre of the match
   * @param {Object} [terrain] - The terrain of the match
   * @param {Object} [premiereEquipe] - The first team
   * @param {Object} [deuxiemeEquipe] - The second team
   * @param {Object} [tournoi] - The tournoi
   */
  static mapToMatch(data: any): Match {

    let arbitre = User.mapToUser(data.arbitre);
    let terrain = Terrain.mapToTerrain(data.terrain);
    let premiereEquipe = Equipe.mapToEquipe(data.premiereEquipe);
    let secondEquipe = Equipe.mapToEquipe(data.deuxiemeEquipe);
    let date_debut = moment(data.dateDebut, 'YYYY-MM-DD HH:mm:ss');
    let date_fin = data.dateFin == null ? null : moment(data.dateFin, 'YYYY-MM-DD HH:mm:ss');
    let tournoi = Tournoi.mapToTournoi(data.tournoi);
    return new Match(data.idMatch, data.scorePremiereEquipe, data.scoreDeuxiemeEquipe, data.temps, date_debut, date_fin, arbitre, terrain,
      tournoi, premiereEquipe, secondEquipe);
  }

}
