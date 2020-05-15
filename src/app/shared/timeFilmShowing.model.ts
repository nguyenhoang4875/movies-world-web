export class TimeFilmShowing {
  public id: string;
  public date: Date[];
  public timeStart: Date[];
  public timeEnd?: Date[];

  constructor(init?: Partial<TimeFilmShowing>) {
    Object.assign(this, init);
  }
}
