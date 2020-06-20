import { Room } from "./room.model";
export class ShowTimeFilm {
  public id: number;
  public time: Date;
  public timeEnd?: Date;
  public room?: Room;

  constructor(init?: Partial<ShowTimeFilm>) {
    Object.assign(this, init);
  }
}
