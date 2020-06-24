import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { cloneDeep } from "lodash";
import { Subscription, Subject } from "rxjs";

import { DataStorageService } from "../../shared/services/data-storage.service";
import { Movie } from "../../movies/movie.model";
import { ShowTimeFilm } from "../../shared/showTimeFilm.model";
import { MovieService } from "../../movies/movie.service";

@Component({
  selector: "app-show-time-film-list",
  templateUrl: "./show-time-film-list.component.html",
  styleUrls: ["./show-time-film-list.component.css"],
})
export class ShowTimeFilmListComponent implements OnInit {
  subscription: Subscription;
  id: number;
  movie: Movie = new Movie();
  isLoading = false;

  showTImeFilmList: ShowTimeFilm[] = [];
  showedShowTimeFilm: ShowTimeFilm[] = [];
  search: string;
  page: number;
  pages: number;
  pagesArr: number[] = [];
  currentPage: number;
  numberOfPage = 5;

  idChange = new Subject<number>();

  constructor(
    private movieService: MovieService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
    });
    this.loadingMovie(this.id);
  }

  private loadingShowTimeFilm() {
    this.isLoading = true;
    this.initShowTimeFilm(this.id);
  }

  private loadingMovie(id: number) {
    this.subscription = this.movieService
      .fetchMovie(id)
      .subscribe((movie: Movie) => {
        this.movie = movie;
        this.loadingShowTimeFilm();
      });
  }

  private initShowTimeFilm(id: number) {
    this.subscription = this.dataStorageService
      .fetchShowTimeFilmListById(id)
      .subscribe((showTImeFilmList: ShowTimeFilm[]) => {
        this.showTImeFilmList = showTImeFilmList;
        this.separatePage(showTImeFilmList);
      });
  }

  private separatePage(showTImeFilmList: ShowTimeFilm[]) {
    if (showTImeFilmList) {
      this.pages = Math.ceil(showTImeFilmList.length / this.numberOfPage);
      for (let i = 1; i <= this.pages; i++) {
        this.pagesArr.push(i);
      }
      this.onSelectPage(1);
      this.isLoading = false;
    } else {
      this.isLoading = false;
    }
  }

  onSelectPage(page: number) {
    this.currentPage = page;
    const temp = cloneDeep(this.showTImeFilmList);

    this.showedShowTimeFilm = temp.splice(
      this.numberOfPage * (page - 1),
      this.numberOfPage
    );
  }

  onNextPage() {
    if (this.currentPage == this.pages) {
      return;
    }
    this.onSelectPage(this.currentPage + 1);
  }

  onPreviousPage() {
    if (this.currentPage == 1) {
      return;
    }
    this.onSelectPage(this.currentPage - 1);
  }

  newShowTimeFilm(e) {
    this.idChange.next(this.id);
    this.router.navigate(["new"], { relativeTo: this.route });
  }
}
