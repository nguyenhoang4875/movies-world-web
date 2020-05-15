import { Injectable } from "@angular/core";
import { Movie } from "./movie.model";
import { Description } from "../shared/description.model";
import { TimeFilmShowing } from "../shared/timeFilmShowing.model";

@Injectable({ providedIn: "root" })
export class MovieService {
  private movies: Movie[] = [
    new Movie({
      id: "1",
      name: "Mắt Biếc",
      trailer: "http://MatBiec",
      genre: ["Tình Cảm", "Học Trò"],
      rating: 8.9,
      status: "Enable",
      picture: "assets/images/logo.png",
    }),
    new Movie({
      id: "2",
      name: "Spider Man: Come Back Home",
      trailer: "http://SpiderMan",
      genre: ["Hành động", "Viễn Tưởng"],
      rating: 8,
      status: "Disable",
      picture: "assets/images/logo.png",
    }),
    new Movie({
      id: "3",
      name: "Mắt Biếc",
      trailer: "http://MatBiec",
      genre: ["Tình Cảm", "Học Trò"],
      rating: 8.9,
      status: "Enable",
      picture: "assets/images/logo.png",
    }),
    new Movie({
      id: "4",
      name: "Spider Man: Come Back Home",
      trailer: "http://SpiderMan",
      genre: ["Hành động", "Viễn Tưởng"],
      rating: 7,
      status: "Disable",
      picture: "assets/images/logo.png",
    }),
    new Movie({
      id: "5",
      name: "Spider Man: Come Back Home",
      trailer: "http://SpiderMan",
      genre: ["Hành động", "Viễn Tưởng"],
      rating: 7.5,
      status: "Disable",
      picture: "assets/images/logo.png",
    }),
  ];
  getMovies() {
    return this.movies.slice();
  }
}
