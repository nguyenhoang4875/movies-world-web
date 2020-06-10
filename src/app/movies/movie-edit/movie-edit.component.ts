import { Component, OnInit, ViewChild } from "@angular/core";
import { DateTime } from "../../shared/DateTime.model";
import { FormControl } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";

@Component({
  selector: "app-movie-edit",
  templateUrl: "./movie-edit.component.html",
  styleUrls: ["./movie-edit.component.css"],
})
export class MovieEditComponent implements OnInit {
  count = 0;
  countTime = 0;
  amountOfDate: DateTime[] = [];
  @ViewChild("picker", {
    static: false,
  })
  picker: any;
  public color: ThemePalette = "accent";

  date: Date = new Date();
  // settings = {
  //   bigBanner: false,
  //   timePicker: true,
  //   format: "dd-MM-yyyy hh:mm a",
  //   defaultOpen: false,
  //   closeOnSelect: true,
  // };

  dateControl = new FormControl(null);
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
