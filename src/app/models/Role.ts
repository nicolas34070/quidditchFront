export class Role {

  /**
   *
   * @param {number} [idRole] - The id of the role
   * @param {String} [score] - The name of the role
   */
  constructor(
    public idRole: number,
    public name?: string,
  ) { }




  /**
   *
   * @param {number} [idMatch] - The id of the role
   * @param {String} [score] - The name of the role
   * @returns {Role} - The user object created from data values
   */
  static mapToRole(data: any): Role {
    return new Role(data.idRole, data.name);
  }

}
