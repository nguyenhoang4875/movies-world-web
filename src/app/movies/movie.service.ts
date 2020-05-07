import { Injectable } from "@angular/core";
import { Movie } from "./movie.model";

@Injectable({ providedIn: "root" })
export class MovieService {
  private movies: Movie[] = [
    new Movie(
      "1",
      "Mắt Biếc",
      "http://MatBiec",
      ["Tình Cảm", "Học Trò"],
      8.9,
      "Enable",
      ""
    ),
    new Movie(
      "2",
      "Spider Man: Come Back Home",
      "http://SpiderMan",
      ["Hành động", "Viễn Tưởng"],
      8,
      "Disable",
      ""
    ),
    new Movie(
      "3",
      "Mắt Biếc",
      "http://MatBiec",
      ["Tình Cảm", "Học Trò"],
      8.9,
      "Enable",
      ""
    ),
    new Movie(
      "4",
      "Spider Man: Come Back Home",
      "http://SpiderMan",
      ["Hành động", "Viễn Tưởng"],
      7,
      "Disable",
      ""
    ),
    new Movie(
      "5",
      "Spider Man: Come Back Home",
      "http://SpiderMan",
      ["Hành động", "Viễn Tưởng"],
      7.5,
      "Disable",
      ""
    ),
  ];

  getMovies() {
    return this.movies.slice();
  }
}
