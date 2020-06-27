import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
} from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { cloneDeep } from "lodash";
import { Subscription, Subject } from "rxjs";

import { DataStorageService } from "../../shared/services/data-storage.service";
import { Movie } from "../../movies/movie.model";
import { ShowTimeFilm } from "../../shared/showTimeFilm.model";
import { MovieService } from "../../movies/movie.service";
import { AlertComponent } from "src/app/shared/layout/alert/alert.component";
import { PlaceholderDirective } from "../../shared/placeholder/placeholder.directive";
import { ToastShowService } from "../../shared/services/toast-show.service";

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
  isToastsShowing = false;
  isSucceeding = false;
  message: string = "";

  idChange = new Subject<number>();

  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  constructor(
    private movieService: MovieService,
    private dataStorageService: DataStorageService,
    private toastShowService: ToastShowService,
    private router: Router,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver
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

  private onShowToasts() {
    this.subscription = this.toastShowService.isToastsChanged.subscribe(
      (value) => {
        if (typeof value === "boolean") {
          this.isToastsShowing = value;
          this.isSucceeding = true;
          this.message = "Table has been updated successfully!!!";
        } else {
          this.isToastsShowing = true;
          this.isSucceeding = false;
          this.message = "Manipulation has been implement !!!";
        }
        setTimeout(() => {
          this.isToastsShowing = false;
        }, 2000);
      }
    );
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

  newShowTimeFilm() {
    this.idChange.next(this.id);
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  onDeleteShowTimeFilm(id: number) {
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
      this.movieService.deleteShowTimeFilm(id).subscribe((value) => {
        hostViewContainerRef.clear();
        const index = this.showedShowTimeFilm.findIndex((_) => _.id === id);
        this.showedShowTimeFilm.splice(index, 1);
        this.movieService.onShowToasts(true);
      });
    });

    this.subscription = componentRef.instance.close.subscribe(() => {
      // remove subscription when component removed
      this.subscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
