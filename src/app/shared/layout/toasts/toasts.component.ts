import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-toasts",
  templateUrl: "./toasts.component.html",
  styleUrls: ["./toasts.component.css"],
})
export class ToastsComponent implements OnInit {
  @Input() isToastShowing: boolean;
  constructor() {}

  ngOnInit() {}
}
