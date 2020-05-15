import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Description } from "../../shared/description.model";
import { MovieService } from "../movie.service";
import { Movie } from "../movie.model";
import { TimeFilmShowing } from "../../shared/timeFilmShowing.model";

@Component({
  selector: "app-movie-detail",
  templateUrl: "./movie-detail.component.html",
  styleUrls: ["./movie-detail.component.css"],
})
export class MovieDetailComponent implements OnInit {
  colon = ":";
  hyphen = "-";
  movie: Movie = new Movie();
  description: Description = new Description();
  timeFilmShowing: TimeFilmShowing = new TimeFilmShowing();
  id: string;
  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.id = param["id"];
    });
    this.movie = this.movieService.getMovie(this.id);
    this.description = this.movieService.getDescription(this.id);
    this.timeFilmShowing = this.movieService.getTimeFilmShowing(this.id);
    this.getTimeEndOfMovie(this.timeFilmShowing);
  }

  getTimeEndOfMovie(timeFilmShowing: TimeFilmShowing) {
    let timeOffsetHours = Math.floor(+this.description.timeLimit / 60);
    let timeOffsetMminutes = +this.description.timeLimit - timeOffsetHours * 60;
    let time = timeFilmShowing.timeStart;
    for (let i = 0; i < timeFilmShowing.timeStart.length; i++) {
      timeFilmShowing.timeEnd.push(
        new Date(
          time[i].getFullYear(),
          time[i].getMonth(),
          time[i].getDate(),
          time[i].getHours() + timeOffsetHours,
          timeOffsetMminutes
        )
      );
    }
  }
}
