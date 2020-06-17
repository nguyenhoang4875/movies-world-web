export class Room {
  id: number;
  name: string;
  constructor(init?: Partial<Room>) {
    Object.assign(this, init);
  }
}
