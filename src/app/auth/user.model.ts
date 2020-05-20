import { Role } from "./role.model";
export class User {
  constructor(
    public username: string,
    private _token: string,
    public idRole: number[]
  ) {}

  get token() {
    return this._token;
  }
}
