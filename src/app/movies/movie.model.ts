import { Description } from "../shared/description.model";
import { Genre } from "../shared/genre.model";
export class Movie {
  public id: number;
  public name: string;
  public trailer: string;
  public poster: string;
  public genres: Genre[];
  public ratePoint: number;
  public status: boolean;
  public filmDescription: Description;
  public image?: File;

  constructor(init?: Partial<Movie>) {
    Object.assign(this, init);
  }
}
