import { Injectable } from "@angular/core";
import { Movie } from "./movie.model";
import { Description } from "../shared/description.model";
import { ShowTimeFilm } from "../shared/showTimeFilm.model";
import { Subject, Observable, BehaviorSubject } from "rxjs";
import { DataStorageService } from "../shared/services/data-storage.service";
import { tap } from "rxjs/operators";
import { Genre } from "../shared/genre.model";

@Injectable({ providedIn: "root" })
export class MovieService {
  private movies: Movie[] = [];

  private showTimeFilm: ShowTimeFilm[] = [];
  moviesChanged = new Subject<Movie[]>();
  isToastsChanged = new BehaviorSubject<boolean>(false);

  constructor(private dataStorageService: DataStorageService) {}
  fetchMovies() {
    return this.dataStorageService.fetchMovies().pipe(
      tap((movies) => {
        this.setMovies(movies);
      })
    );
  }

  fetchMovie(id: number): Observable<Movie> {
    return this.dataStorageService.fetchMovie(id);
  }

  fetchGenre(): Observable<Genre[]> {
    return this.dataStorageService.fetchGenre();
  }

  fetchShowTimeFilmList(id: number) {
    return this.dataStorageService.fetchShowTimeFilmListById(id);
  }

  fetchShowTimeFilm(id: number) {
    return this.dataStorageService.fetchShowTimeFilm(id);
  }

  fetchRooms() {
    return this.dataStorageService.fetchRooms();
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

  setIdMovie(url: string): number {
    let s = url.substring(14);
    let index = s.indexOf("/");
    return +s.substring(0, index);
  }

  getUpdateStatusMovie(movie: Movie) {
    const index = +movie.id - 1;
    this.movies[index] = movie;
    this.moviesChanged.next(this.movies.slice());
  }

  postFileUpLoad(fileToUpLoad: File) {
    return this.dataStorageService.postFileUpLoad(fileToUpLoad);
  }
  newMovie(movie: Movie): Observable<Movie> {
    return this.dataStorageService.newMovie(movie);
  }

  updateMovie(id: number, movie: Movie): Observable<Movie> {
    return this.dataStorageService.updateMovie(id, movie);
  }

  deleteMovie(id: number): Observable<any> {
    return this.dataStorageService.deleteMovie(id);
  }

  newShowTimeFilm(
    id: number,
    showTimeFilm: ShowTimeFilm
  ): Observable<ShowTimeFilm> {
    return this.dataStorageService.newShowTimeFilm(id, showTimeFilm);
  }

  updateShowTimeFilm(id: number, showTimeFilm: ShowTimeFilm) {
    return this.dataStorageService.updateShowTimeFilm(id, showTimeFilm);
  }

  deleteShowTimeFilm(id: number) {
    return this.dataStorageService.deleteShowTimeFilm(id);
  }

  getSeats(id: number) {
    return this.dataStorageService.getSeats(id);
  }

  getInforReservation(id: number) {
    return this.dataStorageService.getInforReservation(id);
  }

  updateStatus(id: number, movie: Movie) {
    return this.dataStorageService.updateStatus(id, movie);
  }

  onShowToasts(value: boolean) {
    this.isToastsChanged.next(value);
  }

  searchMovies(keyword: string): Observable<Movie[]> {
    return this.dataStorageService.searchMovies(keyword);
  }
}
