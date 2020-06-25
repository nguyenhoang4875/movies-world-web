export class Reservation {
  public fullNameUser: string;
  public emailUser: string;
  public timeCreated: Date;

  constructor(init?: Partial<Reservation>) {
    Object.assign(this, init);
  }
}
