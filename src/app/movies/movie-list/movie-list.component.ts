import { Component, OnInit } from "@angular/core";
import { cloneDeep } from "lodash";
import { Movie } from "../movie.model";
import { MovieService } from "../movie.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.css"],
})
export class MovieListComponent implements OnInit {
  subscription: Subscription;
  movies: Movie[] = [];
  showedMovies: Movie[] = [];

  search: string;
  page: number;
  pages: number;
  pagesArr: number[] = [];
  currentPage: number;
  numberOfPage = 2;
  isLoading = false;
  isShowStaffDetail = false;

  constructor(private movieService: MovieService, private route: Router) {}

  ngOnInit() {
    this.loadMovies();
  }

  private loadMovies() {
    this.isLoading = true;

    this.movies = this.movieService.getMovies();
    console.log(this.movies);
    this.separatePage(this.movies);
  }

  private separatePage(movies: Movie[]) {
    if (movies) {
      this.pages = Math.ceil(movies.length / this.numberOfPage);
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
    const temp = cloneDeep(this.movies);

    this.showedMovies = temp.splice(
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
