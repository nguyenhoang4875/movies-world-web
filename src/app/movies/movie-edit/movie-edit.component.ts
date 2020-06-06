import { Component, OnInit } from "@angular/core";
import { DateTime } from "../../shared/DateTime.model";

@Component({
  selector: "app-movie-edit",
  templateUrl: "./movie-edit.component.html",
  styleUrls: ["./movie-edit.component.css"],
})
export class MovieEditComponent implements OnInit {
  count = 0;
  countTime = 0;
  amountOfDate: DateTime[] = [];
  constructor() {}

  ngOnInit() {}

  Increase() {
    this.amountOfDate.push({
      count: this.count,
      time: [],
    });
    this.count++;
  }
  IncreaseAmountTime(i: DateTime) {
    i.time.push(this.countTime);
    this.countTime++;
  }
}
