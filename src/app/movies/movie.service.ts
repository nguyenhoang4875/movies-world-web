import { Injectable } from "@angular/core";
import { Movie } from "./movie.model";
import { Description } from "../shared/description.model";
import { ShowTimeFilm } from "../shared/showTimeFilm.model";
import { Subject, Observable } from "rxjs";
import { DataStorageService } from "../shared/services/data-storage.service";
import { tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class MovieService {
  private movies: Movie[] = [];

  private showTimeFilm: ShowTimeFilm[] = [];
  moviesChanged = new Subject<Movie[]>();

  constructor(private dataStorageService: DataStorageService) {}
  fetchMoves() {
    return this.dataStorageService.fetchMovies().pipe(
      tap((movies) => {
        this.setMovies(movies);
      })
    );
  }

  setMovies(movies: Movie[]) {
    this.movies = movies;
  }

  getMovies() {
    return this.movies.slice();
  }

  getMovie(id: number) {
    let position = this.getIndex(id);
    return this.movies[position];
  }

  getIndex(id: number): number {
    let position = 0;
    this.movies.forEach((item, index) => {
      if (item.id === id) {
        position = index;
      }
    });
    return position;
  }

  fetchShowTimeFilm(id: number) {
    return this.dataStorageService.fetchShowTimeFilmById(id);
  }

  fetchRooms() {
    return this.dataStorageService.fetchRooms();
  }

  getUpdateStatusMovie(movie: Movie) {
    const index = +movie.id - 1;
    this.movies[index] = movie;
    this.moviesChanged.next(this.movies.slice());
  }

  newMovie(movie: Movie): Observable<Movie> {
    return this.dataStorageService.newMovie(movie);
  }

  newShowTimeFilm(
    id: number,
    showTimeFilm: ShowTimeFilm
  ): Observable<ShowTimeFilm> {
    return this.dataStorageService.newShowTimeFilm(id, showTimeFilm);
  }

  // searchMovie(value: string) {
  //   let filterMovies: Movie[] = [];
  //   if (!value) {
  //     this.moviesChanged.next(this.movies.slice());
  //   } else {
  //     if (value) {
  //       for (let i = 0; i < this.movies.length; i++) {
  //         if (
  //           this.movies[i].name === value ||
  //           this.movies[i].rating === +value ||
  //           this.movies[i].status === value
  //         ) {
  //           filterMovies.push(this.movies[i]);
  //         }
  //       }
  //     }
  //     this.moviesChanged.next(filterMovies);
  //   }
  // }
}
