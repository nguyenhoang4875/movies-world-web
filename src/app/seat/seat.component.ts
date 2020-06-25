import { Component, OnInit, OnDestroy } from "@angular/core";
import { Seat } from "../shared/seat.model";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { MovieService } from "../movies/movie.service";
import { Reservation } from "../shared/reservation.model";
import { Subscription } from "rxjs";
import { ShowTimeFilm } from "../shared/showTimeFilm.model";
import { Movie } from "../movies/movie.model";

@Component({
  selector: "app-seat",
  templateUrl: "./seat.component.html",
  styleUrls: ["./seat.component.css"],
})
export class SeatComponent implements OnInit, OnDestroy {
  idShowTimeFilm: number;
  idFilm: number;
  url: string = "";
  seats: Seat[] = [];
  showTimeFilm: ShowTimeFilm = new ShowTimeFilm();
  movie: Movie = new Movie();
  subscription: Subscription;

  inforReservation: Reservation = new Reservation();

  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.url = this.router.url;
    this.idFilm = this.movieService.setIdMovie(this.url);
    this, this.getMovie(this.idFilm);
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.idShowTimeFilm = +params["id"];
      this.getSeats(this.idShowTimeFilm);
      this.subscription = this.movieService
        .fetchShowTimeFilm(this.idShowTimeFilm)
        .subscribe((showTimeFilm: ShowTimeFilm) => {
          this.showTimeFilm = showTimeFilm;
        });
    });
  }

  private getSeats(id: number) {
    this.movieService.getSeats(id).subscribe((seats: Seat[]) => {
      this.seats = seats;
    });
  }

  getMovie(id: number) {
    this.subscription = this.movieService
      .fetchMovie(id)
      .subscribe((movie: Movie) => {
        this.movie = movie;
      });
  }

  onGetInforReservation(reservationId: number) {
    console.log(reservationId);
    this.subscription = this.movieService
      .getInforReservation(reservationId)
      .subscribe((reservation: Reservation) => {
        console.log(reservation);
        this.inforReservation = reservation;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
