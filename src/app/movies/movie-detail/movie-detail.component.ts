import { Component, OnInit, ɵɵi18nPostprocess } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Description } from "../../shared/description.model";
import { MovieService } from "../movie.service";
import { Movie } from "../movie.model";
import { ShowTimeFilm } from "../../shared/showTimeFilm.model";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-movie-detail",
  templateUrl: "./movie-detail.component.html",
  styleUrls: ["./movie-detail.component.css"],
})
export class MovieDetailComponent implements OnInit {
  hyphen = "-";
  movie: Movie = new Movie();
  filmDescription: Description = new Description();
  showTimeFilm: ShowTimeFilm[] = [];
  id: string;
  urlImage: string;
  genre: string;
  baseUrl = environment.baseUrl;

  datetime = new Object();
  dateOutput = new Array();
  timeOutput = new Array();

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.id = param["id"];
    });

    this.movieService.fetchMovie(+this.id).subscribe((movie: Movie) => {
      this.movie = movie;
      console.log(movie);
      this.genre = movie.genres
        .map((item) => {
          return item.name;
        })
        .join(", ");
      this.urlImage = this.baseUrl + "/images" + "/" + this.movie.poster;
      console.log(this.urlImage);
      this.filmDescription = this.movie.filmDescription;
    });

    this.movieService
      .fetchShowTimeFilmList(+this.id)
      .subscribe((showTimeFilm) => {
        this.showTimeFilm = showTimeFilm;

        this.datetime = this.getDateTimeOfOneDate(
          this.showTimeFilm,
          this.filmDescription
        );

        // get date of a Date
        this.dateOutput = Object.keys(this.datetime);

        // get Time Start and End
        this.dateOutput.forEach((item) => {
          const timeStartEnd = new Array();
          this.datetime[item].start.forEach((timeItem, index) => {
            timeStartEnd.push({
              start: this.datetime[item].start[index],
              end: this.datetime[item].end[index],
            });
          });

          this.timeOutput.push(timeStartEnd);
        });
      });
  }

  private getDateTimeOfOneDate(array, filmDescription: Description) {
    if (!array) {
      return {};
    } else {
      return array.reduce((allDates, oneDate: ShowTimeFilm) => {
        const time = new Date(oneDate.time);

        const date = time.getDate();
        const month = time.getMonth();
        const year = time.getFullYear();

        const key = "" + date + "/" + month + "/" + year;

        allDates[key] = allDates[key] || new Object();
        allDates[key].start = allDates[key].start || new Array();
        allDates[key].end = allDates[key].end || new Array();
        allDates[key].start.push(time);

        const timeLimit = time.getMinutes() + +filmDescription.timeLimit;
        const timeEnd = new Date(time);
        timeEnd.setMinutes(timeLimit);

        allDates[key].end.push(timeEnd);

        return allDates;
      }, {});
    }
  }
}
