import { Role } from "./role.model";
export class User {
  public username: string;
  private _token: string;
  public expired: Date;
  public roles: Array<Role>;
  constructor(
    username: string,
    token: string,
    expired: Date,
    roles: Array<Role>
  ) {
    this.username = username;
    this._token = token;
    this.expired = expired;
    this.roles = roles;
  }

  get token() {
    return this._token;
  }
}
