import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";

import { Room } from "../../shared/room.model";
import { MovieService } from "../movie.service";
import { Movie } from "../movie.model";

@Component({
  selector: "app-movie-edit",
  templateUrl: "./movie-edit.component.html",
  styleUrls: ["./movie-edit.component.css"],
})
export class MovieEditComponent implements OnInit, OnDestroy {
  // count = 0;
  // arrayTimeShowing = [];
  id: number;
  editMode: boolean = false;
  subscription: Subscription;
  movies: Movie[] = [];

  movieForm: FormGroup;
  fileToUpload: File = null;
  genres = new FormControl();
  genreList: string[] = [
    "Extra cheese",
    "Mushroom",
    "Onion",
    "Pepperoni",
    "Sausage",
    "Tomato",
  ];

  // color: ThemePalette = "accent";

  @ViewChild("picker", {
    static: false,
  })
  picker;

  @ViewChild("labelImport", { static: false }) labelImport: ElementRef;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.movies = this.movieService.getMovies();
    // this.subscription = this.route.params.subscribe((params: Params) => {
    //   this.id = +params["id"];
    //   this.editMode = params["id"] != null;
    //   console.log(this.editMode);
    //   if (this.editMode) {
    //     this.editingMovie = this.movieService.getMovie(this.id);
    //     this.movieService.fetchShowTimeFilm(this.id).subscribe((dates) => {
    //       this.showTimeFilm = dates;
    //     });
    //   }
    // });
    // this.subscription = this.movieService.fetchRooms().subscribe((rooms) => {
    //   this.rooms = rooms;
    //   console.log(this.rooms);
    // });
    this.movies = this.movieService.getMovies();
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.initForm();
    });
  }

  // increaseTimeShowing() {
  //   this.arrayTimeShowing.push(this.count);
  //   this.count++;
  // }

  onSubmit() {
    if (!this.editMode) {
      this.subscription = this.movieService
        .newMovie(this.movieForm.value)
        .subscribe((movie) => {
          this.movies.push(movie);
          this.router.navigate(["../"], { relativeTo: this.route });
        });
      console.log(this.movieForm.value);
    } else {
    }
  }

  onFileChange(files: FileList) {
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map((f) => f.name)
      .join(", ");
    this.fileToUpload = files.item(0);
  }

  initForm() {
    let nameFilm = "";
    let trailer = "";
    let importFile = "";
    let genres = [];
    let timeLimit = "";
    let director = "";
    let artist = "";
    let nation = "";
    let premiere = null;
    let content = "";

    if (this.editMode) {
      const movie = this.movieService.getMovie(this.id);
      nameFilm = movie.name;
      trailer = movie.trailer;
      importFile = movie.poster;
      genres = movie.genre;
      timeLimit = movie.filmDescription.timeLimit;
      director = movie.filmDescription.director;
      artist = movie.filmDescription.artist;
      nation = movie.filmDescription.nation;
      premiere = movie.filmDescription.premiere;
      content = movie.filmDescription.content;
    }

    //initial form
    this.movieForm = new FormGroup({
      nameFilm: new FormControl(nameFilm),
      trailer: new FormControl(trailer),
      importFile: new FormControl(importFile),
      genres: new FormControl(this.genres),
      filmDescription: new FormGroup({
        timeLimit: new FormControl(timeLimit),
        director: new FormControl(director),
        artist: new FormControl(artist),
        nation: new FormControl(nation),
        premiere: new FormControl(premiere),
        content: new FormControl(content),
      }),
    });
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
