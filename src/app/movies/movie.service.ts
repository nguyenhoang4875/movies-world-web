import { Injectable } from "@angular/core";
import { Movie } from "./movie.model";
import { Description } from "../shared/description.model";
import { ShowTimeFilm } from "../shared/showTimeFilm.model";
import { Subject } from "rxjs";
import { DataStorageService } from "../shared/services/data-storage.service";
import { tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class MovieService {
  private movies: Movie[] = [];

  private showTimeFilm: ShowTimeFilm[] = [
    // new TimeFilmShowing({
    //   id: 1,
    //   date: [new Date(2020, 4, 8), new Date(2020, 4, 9), new Date(2020, 4, 10)],
    //   timeStart: [
    //     new Date(2020, 4, 8, 9),
    //     new Date(2020, 4, 8, 15),
    //     new Date(2020, 4, 9, 11),
    //     new Date(2020, 4, 10, 12),
    //     new Date(2020, 4, 10, 14),
    //   ],
    //   timeEnd: [],
    // }),
    // new TimeFilmShowing({
    //   id: 2,
    //   date: [new Date(2020, 4, 8), new Date(2020, 4, 9), new Date(2020, 4, 10)],
    //   timeStart: [
    //     new Date(2020, 4, 8, 9),
    //     new Date(2020, 4, 8, 15),
    //     new Date(2020, 4, 9, 11),
    //     new Date(2020, 4, 10, 12),
    //     new Date(2020, 4, 10, 14),
    //   ],
    //   timeEnd: [],
    // }),
    // new TimeFilmShowing({
    //   id: 3,
    //   date: [new Date(2020, 4, 8), new Date(2020, 4, 9), new Date(2020, 4, 10)],
    //   timeStart: [
    //     new Date(2020, 4, 8, 9),
    //     new Date(2020, 4, 8, 15),
    //     new Date(2020, 4, 9, 11),
    //     new Date(2020, 4, 10, 12),
    //     new Date(2020, 4, 10, 14),
    //   ],
    //   timeEnd: [],
    // }),
    // new TimeFilmShowing({
    //   id: 4,
    //   date: [new Date(2020, 4, 8), new Date(2020, 4, 9), new Date(2020, 4, 10)],
    //   timeStart: [
    //     new Date(2020, 4, 8, 9, 15),
    //     new Date(2020, 4, 8, 15),
    //     new Date(2020, 4, 9, 11),
    //     new Date(2020, 4, 10, 12),
    //     new Date(2020, 4, 10, 14),
    //   ],
    //   timeEnd: [],
    // }),
    // new TimeFilmShowing({
    //   id: 5,
    //   date: [new Date(2020, 4, 8), new Date(2020, 4, 9), new Date(2020, 4, 10)],
    //   timeStart: [
    //     new Date(2020, 4, 8, 9),
    //     new Date(2020, 4, 8, 15),
    //     new Date(2020, 4, 9, 11),
    //     new Date(2020, 4, 10, 12),
    //     new Date(2020, 4, 10, 14),
    //   ],
    //   timeEnd: [],
    // }),
  ];
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
