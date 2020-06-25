export class Seat {
  public id: number;
  public name: string;
  public status: number;

  constructor(init?: Partial<Seat>) {
    Object.assign(this, init);
  }
}
