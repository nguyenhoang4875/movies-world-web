export class ShowTimeFilm {
  public time: Date;
  public timeEnd?: Date;

  constructor(init?: Partial<ShowTimeFilm>) {
    Object.assign(this, init);
  }
}
