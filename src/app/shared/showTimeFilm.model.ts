import { Room } from "./room.model";
export class ShowTimeFilm {
  public time: Date;
  public timeEnd?: Date;
  public room?: Room;

  constructor(init?: Partial<ShowTimeFilm>) {
    Object.assign(this, init);
  }
}
