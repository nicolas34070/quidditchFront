import * as moment from 'moment';
import {Moment} from "moment";


export class Tournoi {

  /**
   *
   * @param {number} [id] - The id of the tournoi
   * @param {String} [nom] - The name of the tournoi
   * @param {Moment} [date] - The role of the tournoi
   * @param {String} [pays] - The pays of the tournoi
   */
  constructor(
    public idTournoi: number,
    public nom?: string,
    public date?: Moment,
    public pays?: string

  ) { }




  /**
   * Converts an object with any type into a User object.
   * @param {number} [id] - The id of the tournoi
   * @param {String} [nom] - The name of the tournoi
   * @param {Moment} [date] - The role of the tournoi
   * @param {String} [pays] - The pays of the tournoi
   * @returns {Tournoi} - The tournoi object created from data values
   */
  static mapToTournoi(data: any): Tournoi {
    let date = moment(data.date, 'YYYY-MM-DD HH:mm:ss');
    return new Tournoi(data.idTournoi, data.nom, date, data.pays);
  }

}
