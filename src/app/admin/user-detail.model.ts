export class UserDetail {
  id: number;
  username: string;
  password: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;

  constructor(init?: Partial<UserDetail>) {
    Object.assign(this, init);
  }

  public toString(): string {
    return `{${this.id} - ${this.username}- ${this.fullName} - ${this.email} - ${this.phone} - ${this.address}}`;
  }
}
