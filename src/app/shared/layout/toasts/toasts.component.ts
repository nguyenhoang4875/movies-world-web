import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-toasts",
  templateUrl: "./toasts.component.html",
  styleUrls: ["./toasts.component.css"],
})
export class ToastsComponent implements OnInit {
  @Input() isToastShowing: boolean;
  @Input() message: string;
  @Input() isSucceeding: boolean;
  constructor() {}

  ngOnInit() {}
}
