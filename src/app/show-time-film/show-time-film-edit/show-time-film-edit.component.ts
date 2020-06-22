import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
import { Subscription } from "rxjs";
import {
  Router,
  ActivatedRoute,
  Params,
  NavigationStart,
} from "@angular/router";

import { Room } from "../../shared/room.model";
import { DataStorageService } from "../../shared/services/data-storage.service";
import { MovieService } from "../../movies/movie.service";
import { ShowTimeFilm } from "../../shared/showTimeFilm.model";

@Component({
  selector: "app-show-time-film-edit",
  templateUrl: "./show-time-film-edit.component.html",
  styleUrls: ["./show-time-film-edit.component.css"],
})
export class ShowTimeFilmEditComponent implements OnInit {
  subscription: Subscription;
  id: number;
  editMode: boolean = false;
  showTimeFilmForm: FormGroup;
  showTimeFilmList: ShowTimeFilm[] = [];
  rooms: Room[] = [];

  color: ThemePalette = "accent";
  parameterValue: string;

  constructor(
    private movieService: MovieService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.subscription = this.movieService
      .fetchRooms()
      .subscribe((rooms: Room[]) => {
        this.rooms = rooms;
      });
    this.initForm();
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.initData();
    });
    this.initShowTimeFilm(this.id);
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.parameterValue = this.onSubUrl(e.url.substring(1)).replace(
          /\//g,
          " / "
        );
        if (this.parameterValue === "new") {
          this.editMode = false;
        }
      }
    });
  }

  private onSubUrl(url: string): string {
    let index = url.indexOf("/");
    return url.substring(index + 1);
  }

  private initShowTimeFilm(id: number) {
    this.subscription = this.dataStorageService
      .fetchShowTimeFilmById(this.id)
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
      console.log(this.editMode);
      this.movieService
        .newShowTimeFilm(this.id, showTimeFilm)
        .subscribe((showTimeFilm: ShowTimeFilm) => {
          console.log(showTimeFilm);
          this.showTimeFilmList.push(showTimeFilm);
          this.router.navigate(["../"], { relativeTo: this.route });
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
      //  this.dataStorageService.fetchShowTimeFilmById(this.id).subscribe
    }
  }

  onCancel() {
    if (!this.editMode) {
      this.router.navigate(["/showtimefilm", this.id], {
        relativeTo: this.route,
      });
    } else {
      this.router.navigate(["../../"], { relativeTo: this.route });
    }
  }
}
