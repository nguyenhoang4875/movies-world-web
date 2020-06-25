import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
import { Subscription } from "rxjs";

import { Room } from "../../shared/room.model";
import { DataStorageService } from "../../shared/services/data-storage.service";
import { MovieService } from "../../movies/movie.service";
import { ShowTimeFilm } from "../../shared/showTimeFilm.model";

@Component({
  selector: "app-show-time-film-edit",
  templateUrl: "./show-time-film-edit.component.html",
  styleUrls: ["./show-time-film-edit.component.css"],
})
export class ShowTimeFilmEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  idFilm: number;
  idShowTimeFilm: number;
  editMode: boolean = false;
  showTimeFilmForm: FormGroup;
  showTimeFilmList: ShowTimeFilm[] = [];
  showTimeFilm: ShowTimeFilm;
  rooms: Room[] = [];

  url: string = "";

  color: ThemePalette = "accent";
  parameterValue: string;

  @ViewChild("picker", {
    static: false,
  })
  picker;

  constructor(
    private movieService: MovieService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initRooms();

    this.url = this.router.url;
    this.idFilm = this.movieService.setIdMovie(this.url);
    this.initShowTimeFilm(this.idFilm);
    this.initForm();
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.idShowTimeFilm = +params["id"];
      this.editMode = params["id"] != null;
      this.initData();
    });
  }

  private initRooms() {
    this.subscription = this.movieService
      .fetchRooms()
      .subscribe((rooms: Room[]) => {
        this.rooms = rooms;
      });
  }

  private initShowTimeFilm(id: number) {
    this.subscription = this.dataStorageService
      .fetchShowTimeFilmListById(id)
      .subscribe((showTimeFilmList: ShowTimeFilm[]) => {
        this.showTimeFilmList = showTimeFilmList;
      });
  }

  onSubmit() {
    let showTimeFilm = new ShowTimeFilm({
      time: this.showTimeFilmForm.get("datetime").value,
      room: this.showTimeFilmForm.get("room").value,
    });
    if (!this.editMode) {
      this.subscription = this.movieService
        .newShowTimeFilm(this.idFilm, showTimeFilm)
        .subscribe((showTimeFilm: ShowTimeFilm) => {
          console.log(showTimeFilm);
          this.showTimeFilmList.push(showTimeFilm);
          this.router.navigate(["../"], { relativeTo: this.route });
        });
    } else {
      this.subscription = this.movieService
        .updateShowTimeFilm(this.idShowTimeFilm, showTimeFilm)
        .subscribe((showTimeFilmNew: ShowTimeFilm) => {
          console.log(showTimeFilm);
          this.showTimeFilmList[this.idShowTimeFilm - 1] = showTimeFilmNew;
          this.router.navigate(["../../"], { relativeTo: this.route });
        });
    }
  }

  private initForm() {
    this.showTimeFilmForm = this.formBuilder.group({
      datetime: [null, Validators.required],
      room: [null, Validators.required],
    });
  }

  //initData for existed movie
  private initData(): void {
    if (this.editMode) {
      this.subscription = this.movieService
        .fetchShowTimeFilm(this.idShowTimeFilm)
        .subscribe((showTimeFilm: ShowTimeFilm) => {
          console.log(showTimeFilm);
          this.showTimeFilm = showTimeFilm;
          this.showTimeFilmForm.setValue({
            datetime: new Date(showTimeFilm.time) || null,
            room: showTimeFilm.room || null,
          });
        });
    }
  }

  compareFn(c1: Room, c2: Room): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  onCancel() {
    if (!this.editMode) {
      this.router.navigate(["../"], {
        relativeTo: this.route,
      });
    } else {
      this.router.navigate(["../../"], { relativeTo: this.route });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
