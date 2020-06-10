import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Description } from "../../shared/description.model";
import { MovieService } from "../movie.service";
import { Movie } from "../movie.model";
import { ShowTimeFilm } from "../../shared/showTimeFilm.model";

@Component({
  selector: "app-movie-detail",
  templateUrl: "./movie-detail.component.html",
  styleUrls: ["./movie-detail.component.css"],
})
export class MovieDetailComponent implements OnInit {
  colon = ":";
  hyphen = "-";
  movie: Movie = new Movie();
  filmDescription: Description = new Description();
  showTimeFilm: ShowTimeFilm[] = [];
  id: string;
  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.id = param["id"];
    });
    this.movie = this.movieService.getMovie(+this.id);
    console.log(this.movie);
    this.filmDescription = this.movie.filmDescription;
    console.log(this.filmDescription);
    this.movieService.fetchShowTimeFilm(+this.id).subscribe((showTimeFilm) => {
      this.showTimeFilm = showTimeFilm;
      console.log(this.showTimeFilm);
    });

    // this.getTimeEndOfMovie(this.showTimeFilm);
  }

  // getTimeEndOfMovie(showTimeFilm: ShowTimeFilm) {
  //   let timeOffsetHours = Math.floor(+this.filmDescription.timeLimit / 60);
  //   let timeOffsetMminutes =
  //     +this.filmDescription.timeLimit - timeOffsetHours * 60;
  //   let time = showTimeFilm.time;
  //   for (let i = 0; i < showTimeFilm.time.length; i++) {
  //     showTimeFilm.timeEnd.push(
  //       new Date(
  //         time[i].getFullYear(),
  //         time[i].getMonth(),
  //         time[i].getDate(),
  //         time[i].getHours() + timeOffsetHours,
  //         timeOffsetMminutes
  //       )
  //     );
  //   }
  // }
}
