export class Genre {
  public id: number;
  public name: string;
  constructor(init?: Partial<Genre>) {
    Object.assign(this, init);
  }
}
