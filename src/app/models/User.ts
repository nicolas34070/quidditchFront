import {Role} from "./Role";


export class User {

  /**
   *
   * @param {number} [id] - The id of the user
   * @param {String} [nom] - The name of the user
   * @param {Role} [role] - The role of the user
   */
  constructor(
    public idUtilisateur: number,
    public nom?: string,
    public role?: Role
  ) { }




  /**
   * Converts an object with any type into a User object.
   * @param {number} [id] - The id of the user
   * @param {String} [data.nom] - The name of the user
   * @param {String} [data.role] - The role of the user
   * @returns {User} - The user object created from data values
   */
  static mapToUser(data: any): User {
    let role = Role.mapToRole(data.role);
    return new User(data.idUtilisateur, data.nom, role);
  }

}
