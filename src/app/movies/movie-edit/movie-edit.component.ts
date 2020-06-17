import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";
import { ThemePalette } from "@angular/material/core";

import { Room } from "../../shared/room.model";
import { MovieService } from "../movie.service";
import { Movie } from "../movie.model";
import { ShowTimeFilm } from "../../shared/showTimeFilm.model";

@Component({
  selector: "app-movie-edit",
  templateUrl: "./movie-edit.component.html",
  styleUrls: ["./movie-edit.component.css"],
})
export class MovieEditComponent implements OnInit, OnDestroy {
  count = 0;
  arrayTimeShowing = [];
  rooms: Room[] = [];
  movies: Movie[] = [];
  subscription: Subscription;
  @ViewChild("picker", {
    static: false,
  })
  picker: any;
  public color: ThemePalette = "accent";

  id: number;
  editMode: boolean = false;
  editingMovie: Movie = new Movie();
  date: Date = new Date();
  showTimeFilm: ShowTimeFilm[] = [];
  showTimeFilmNew: ShowTimeFilm = new ShowTimeFilm();

  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.movies = this.movieService.getMovies();
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      console.log(this.editMode);
      if (this.editMode) {
        this.editingMovie = this.movieService.getMovie(this.id);
        this.movieService.fetchShowTimeFilm(this.id).subscribe((dates) => {
          this.showTimeFilm = dates;
        });
      }
    });
    this.subscription = this.movieService.fetchRooms().subscribe((rooms) => {
      this.rooms = rooms;
      console.log(this.rooms);
    });
  }

  increaseTimeShowing() {
    this.arrayTimeShowing.push(this.count);
    this.count++;
  }

  private newMovie() {
    this.subscription = this.movieService
      .newMovie(this.editingMovie)
      .subscribe((movie) => {
        this.movies.push(movie);
        this.movieService
          .newShowTimeFilm(movie.id, this.showTimeFilmNew)
          .subscribe();
        this.router.navigate(["../"], { relativeTo: this.route });
      });
  }

  private EditMovie() {}

  onSaveMovie() {
    if (!this.editMode) {
      this.newMovie();
    }
  }

  onCancel() {
    if (!this.editMode) {
      this.router.navigate(["../"], { relativeTo: this.route });
    } else {
      this.router.navigate(["../../"], { relativeTo: this.route });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
