import { Component, OnInit } from "@angular/core";
import { Seat } from "../shared/seat.model";

@Component({
  selector: "app-seat",
  templateUrl: "./seat.component.html",
  styleUrls: ["./seat.component.css"],
})
export class SeatComponent implements OnInit {
  seats: Seat[] = [
    {
      id: 1,
      name: "A1",
      status: 2,
    },
    {
      id: 2,
      name: "A2",
      status: 2,
    },
    {
      id: 3,
      name: "A3",
      status: 0,
    },
    {
      id: 4,
      name: "A4",
      status: 2,
    },
    {
      id: 5,
      name: "B1",
      status: 1,
    },
    {
      id: 6,
      name: "B2",
      status: 2,
    },
    {
      id: 7,
      name: "B3",
      status: 2,
    },
    {
      id: 8,
      name: "B4",
      status: 1,
    },
    {
      id: 9,
      name: "C1",
      status: 1,
    },
    {
      id: 10,
      name: "C2",
      status: 1,
    },
    {
      id: 11,
      name: "C3",
      status: 1,
    },
    {
      id: 12,
      name: "C4",
      status: 0,
    },
    {
      id: 13,
      name: "D1",
      status: 2,
    },
    {
      id: 14,
      name: "D2",
      status: 0,
    },
    {
      id: 15,
      name: "D3",
      status: 2,
    },
    {
      id: 16,
      name: "D4",
      status: 1,
    },
  ];

  constructor() {}

  ngOnInit() {}
}
