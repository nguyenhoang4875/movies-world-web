export class Movie {
  constructor(
    public id: string,
    public name: string,
    public trailer: string,
    public genre: string[],
    public rating: number,
    public status: string,
    public picture?: string
  ) {}
}
