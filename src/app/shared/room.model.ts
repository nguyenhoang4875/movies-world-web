export class Room {
  name: string;
  constructor(init?: Partial<Room>) {
    Object.assign(this, init);
  }
}
