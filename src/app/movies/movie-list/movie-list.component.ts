import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { cloneDeep } from "lodash";
import { Movie } from "../movie.model";
import { MovieService } from "../movie.service";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.css"],
})
export class MovieListComponent implements OnInit, OnDestroy {
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

  isAuthenticatedStaff = false;

  constructor(
    private movieService: MovieService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadMovies();
    this.decentralize();
  }

  private loadMovies() {
    this.isLoading = true;

    this.subscription = this.movieService.moviesChanged.subscribe(
      (res: Movie[]) => {
        this.movies = res;
        console.log(this.movies);
        this.separatePage(this.movies);
      }
    );

    this.movies = this.movieService.getMovies();
    this.separatePage(this.movies);
  }

  private decentralize() {
    this.subscription = this.authService.user.subscribe((user) => {
      console.log(user);
      if (user && user.idRole.length == 1) {
        this.isAuthenticatedStaff = !!user;
      } else if (user && user.idRole.length >= 2) {
        this.isAuthenticatedStaff = !user;
      }
    });
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

  onChangeStatus(movie: Movie) {
    if (movie.status === "Disable") {
      movie.status = "Enable";
      this.movieService.getUpdateStatusMovie(movie);
    }
  }

  onSearchMovie() {
    this.movieService.searchMovie(this.search);
  }

  newMovie(e) {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  deleteMovie(id: number) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
