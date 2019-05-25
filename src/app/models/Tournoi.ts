import * as moment from 'moment';
import {Moment} from "moment";
import {Pays} from "./Pays";


export class Tournoi {

  /**
   *
   * @param {number} [idTournoi] - The id of the tournoi
   * @param {String} [nom] - The name of the tournoi
   * @param {DateTimeFormat} [date_debut] - The date debut of the tournoi
   * @param {DateTimeFormat} [date_fin] - The date fin of the tournoi
   * @param {Pays} [pays] - The pays of the tournoi
   */
  constructor(
    public idTournoi?: number,
    public nom?: string,
    public dateDebut?: Moment,
    public dateFin?: Moment,
    public pays?: Pays

  ) { }




  /**
   * Converts an object with any type into a User object.
   * @param {number} [idTournoi] - The id of the tournoi
   * @param {String} [nom] - The name of the tournoi
   * @param {DateTimeFormat} [date_debut] - The date debut of the tournoi
   * @param {DateTimeFormat} [date_fin] - The date fin of the tournoi
   * @param {Pays} [pays] - The pays of the tournoi
   * @returns {Tournoi} - The tournoi object created from data values
   */
  static mapToTournoi(data: any): Tournoi {
    let date_debut = moment(data.dateDebut, 'YYYY-MM-DD HH:mm:ss');
    let date_fin = data.dateFin == null ? null : moment(data.dateFin, 'YYYY-MM-DD HH:mm:ss');
    let pays = Pays.mapToPays(data.pays);
    return new Tournoi(data.idTournoi, data.nom, date_debut, date_fin, pays);
  }

}
