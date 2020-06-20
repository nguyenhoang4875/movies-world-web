import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
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

  movie: Movie;

  // color: ThemePalette = "accent";

  @ViewChild("picker", {
    static: false,
  })
  picker;

  @ViewChild("labelImport", { static: false }) labelImport: ElementRef;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
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
    this.initForm();
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.initData();
    });
  }

  // increaseTimeShowing() {
  //   this.arrayTimeShowing.push(this.count);
  //   this.count++;
  // }

  onSubmit() {
    if (!this.editMode) {
      let movie = new Movie({
        name: this.movieForm.get("nameFilm").value,
        trailer: this.movieForm.get("trailer").value,
        poster: null,
        genres: this.movieForm.get("genres").value,
        filmDescription: this.movieForm.get("filmDescription").value,
      });
      this.subscription = this.movieService
        .newMovie(this.fileToUpload, movie)
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
    //initial form
    this.movieForm = this.formBuilder.group({
      name: [null, Validators.required],
      trailer: [null, Validators.required],
      poster: [null, Validators.required],
      genres: [null, Validators.required],
      filmDescription: [
        this.formBuilder.group({
          timeLimit: [null, Validators.required],
          director: [null, Validators.required],
          artist: [null, Validators.required],
          nation: [null, Validators.required],
          premiere: [null, Validators.required],
          content: [null, Validators.required],
        }),
      ],
    });
  }

  //initData for existed movie
  initData(): void {
    if (this.editMode) {
      this.movieService.fetchMovie(this.id).subscribe((movie: Movie) => {
        this.movie = movie;
        this.movieForm.setValue({
          name: movie.name || "",
          trailer: movie.trailer || "",
          poster: movie.poster || "",
          genres: movie.genres || [],
          timeLimit: movie.filmDescription.timeLimit || "",
          director: movie.filmDescription.director || "",
          artist: movie.filmDescription.artist || "",
          nation: movie.filmDescription.nation || "",
          premiere: movie.filmDescription.premiere || null,
          content: movie.filmDescription.content || "",
        });
      });
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
