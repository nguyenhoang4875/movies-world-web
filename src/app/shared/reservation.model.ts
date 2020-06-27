export class Reservation {
  public fullNameUser: string;
  public emailUser: string;
  public timeCreated: string;

  constructor(init?: Partial<Reservation>) {
    Object.assign(this, init);
  }
}
