export class UserInfor {
  id: number;
  username: string;
  password: string;
  fullname: string;
  email: string;
  phone: string;
  address: string;

  constructor(init?: Partial<UserInfor>) {
    Object.assign(this, init);
  }

  public toString(): string {
    return `{${this.id} - ${this.username} - ${this.password} - ${this.fullname} - ${this.email} - ${this.phone} - ${this.address}}`;
  }
}
