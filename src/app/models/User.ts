

export class User {

  /**
   *
   * @param {number} [id] - The id of the user
   * @param {String} [nom] - The name of the user
   * @param {String} [role] - The role of the user
   */
  constructor(
    public id: number,
    public nom?: string,
    public role?: string
  ) { }




  /**
   * Converts an object with any type into a User object.
   * @param {number} [id] - The id of the user
   * @param {String} [data.nom] - The name of the user
   * @param {String} [data.role] - The role of the user
   * @returns {User} - The user object created from data values
   */
  static mapToUser(data: any): User {
    return new User(data.id, data.nom, data.role);
  }

}
