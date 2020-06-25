export class Room {
  id: number;
  name: string;
  listSeats: string;
  constructor(init?: Partial<Room>) {
    Object.assign(this, init);
  }
}
