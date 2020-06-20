import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { cloneDeep } from "lodash";

import { ShowTimeFilm } from "../../shared/showTimeFilm.model";
import { DataStorageService } from "../../shared/services/data-storage.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-show-time-film-list",
  templateUrl: "./show-time-film-list.component.html",
  styleUrls: ["./show-time-film-list.component.css"],
})
export class ShowTimeFilmListComponent implements OnInit {
  subscription: Subscription;
  id: number;
  showTimeFilm: ShowTimeFilm[] = [];
  showedShowTimeFilm: ShowTimeFilm[] = [];
  search: string;
  page: number;
  pages: number;
  pagesArr: number[] = [];
  currentPage: number;
  numberOfPage = 5;

  isLoading = false;

  constructor(
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadingShowTimeFilm();
  }

  private loadingShowTimeFilm() {
    this.isLoading = true;
    this.initShowTimeFilm();
  }

  private initShowTimeFilm() {
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
    });
    this.subscription = this.dataStorageService
      .fetchShowTimeFilmById(this.id)
      .subscribe((showTimeFilm: ShowTimeFilm[]) => {
        this.showTimeFilm = showTimeFilm;
        console.log(showTimeFilm);
        this.separatePage(showTimeFilm);
      });
  }

  private separatePage(showTimeFilm: ShowTimeFilm[]) {
    if (showTimeFilm) {
      this.pages = Math.ceil(showTimeFilm.length / this.numberOfPage);
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
    const temp = cloneDeep(this.showTimeFilm);

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
}
