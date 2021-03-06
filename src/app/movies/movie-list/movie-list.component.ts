import {
  Component,
  OnInit,
  OnDestroy,
  ComponentFactoryResolver,
  ViewChild,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { cloneDeep } from "lodash";
import { Movie } from "../movie.model";
import { MovieService } from "../movie.service";
import { AuthService } from "../../auth/auth.service";
import { AlertComponent } from "src/app/shared/layout/alert/alert.component";
import { PlaceholderDirective } from "../../shared/placeholder/placeholder.directive";
import { ToastShowService } from "../../shared/services/toast-show.service";

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
  numberOfPage = 5;

  isLoading = false;

  isAuthenticatedStaff = false;
  isAdmin: boolean;

  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  constructor(
    private movieService: MovieService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.loadMovies();
    this.authService.checkAdminRole().subscribe((response) => {
      this.isAdmin = response;
    });
  }

  loadMovies() {
    this.isLoading = true;
    this.initialMovies();
  }

  initialMovies() {
    this.subscription = this.movieService
      .fetchMovies()
      .subscribe((movies: Movie[]) => {
        this.movies = movies;
        this.separatePage(this.movies);
      });
  }

  getGenre(movie: Movie): string {
    return movie.genres
      .map((item) => {
        return item.name;
      })
      .join(", ");
  }

  onChangeStatus(id: number) {
    this.movieService.fetchMovie(id).subscribe((movie: Movie) => {
      this.movieService.updateStatus(id, movie).subscribe((res) => {
        if (res) {
          const index = this.showedMovies.findIndex((_) => _.id === id);
          this.showedMovies[index].status = true;
        }
      });
    });
  }

  separatePage(movies: Movie[]) {
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

  newMovie(e) {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  deleteMovie(id: number) {
    // this.movieService.deleteMovie(id).subscribe(() => {
    //   let index = this.movies.findIndex((d) => d.id === id);
    //   this.movies.splice(index, 1);
    // });
    this.showNotification("Do you sure want to do it?", id);
  }

  showNotification(errorMessage: string, id: number) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = errorMessage;

    this.subscription = componentRef.instance.confirm.subscribe(() => {
      this.subscription.unsubscribe();
      this.movieService.deleteMovie(id).subscribe(() => {
        hostViewContainerRef.clear();
        const index = this.showedMovies.findIndex((_) => _.id === id);
        this.showedMovies.splice(index, 1);
      });
    });

    this.subscription = componentRef.instance.close.subscribe(() => {
      // remove subscription when component removed
      this.subscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
