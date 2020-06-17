import { Component, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { ThemePalette } from "@angular/material/core";
import { Room } from "../../shared/room.model";
import { MovieService } from "../movie.service";

@Component({
  selector: "app-movie-edit",
  templateUrl: "./movie-edit.component.html",
  styleUrls: ["./movie-edit.component.css"],
})
export class MovieEditComponent implements OnInit {
  count = 0;
  arrayTimeShowing = [];
  rooms: Room[] = [];
  subscription: Subscription;
  @ViewChild("picker", {
    static: false,
  })
  picker: any;
  public color: ThemePalette = "accent";

  date: Date = new Date();

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.subscription = this.movieService.fetchRooms().subscribe((rooms) => {
      this.rooms = rooms;
      console.log(this.rooms);
    });
  }

  increaseTimeShowing() {
    this.arrayTimeShowing.push(this.count);
    this.count++;
  }
}
